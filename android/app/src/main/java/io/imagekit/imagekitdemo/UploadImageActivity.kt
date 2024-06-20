package io.imagekit.imagekitdemo

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Point
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.gson.Gson
import com.imagekit.android.ImageKit
import com.imagekit.android.ImageKitCallback
import com.imagekit.android.entity.UploadError
import com.imagekit.android.entity.UploadResponse
import com.imagekit.android.preprocess.ImageUploadPreprocessor
import io.imagekit.imagekitdemo.databinding.ActivityUploadImageBinding
import kotlinx.coroutines.launch
import java.io.FileNotFoundException

class UploadImageActivity : AppCompatActivity(), ImageKitCallback, View.OnClickListener {

    private var uploadResultDialog: AlertDialog? = null
    private var loadingDialog: AlertDialog? = null

    private var bitmap: Bitmap? = null

    private var binding: ActivityUploadImageBinding? = null
    private val viewModel: UploadAuthViewModel by viewModels()

    override fun onClick(v: View?) {
        when (v!!.id) {
            R.id.btSelect -> selectImage()
            else -> uploadImage()
        }
    }

    private val RESULT_LOAD_IMG = 109

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUploadImageBinding.inflate(layoutInflater)
        setContentView(binding?.root)

        binding?.btSelect?.setOnClickListener(this)
        binding?.btUpload?.setOnClickListener(this)
    }

    private fun selectImage() {
        val photoPickerIntent = Intent(Intent.ACTION_PICK)
        photoPickerIntent.type = "image/*"
        startActivityForResult(photoPickerIntent, RESULT_LOAD_IMG)
    }

    private fun uploadImage() {
        val tags = arrayOf("nice", "copy", "books")
        val targetFolder = "/dummy/folder"
        val extensions = listOf(
            mapOf("name" to "remove-bg", "options" to mapOf("add_shadow" to true)),
            mapOf("name" to "google-auto-tagging", "minConfidence" to 80, "maxTags" to 5),
        )
        val overwriteAITags = false

        /**
         * Custom metadata fields that will be set on the uploaded file
         * These fields need to be defined in the ImageKit dashboard before they can be used.
         * https://imagekit.io/dashboard/settings/media-library
         *
         * Field definitions used in this example:
         *   -  Field label: Device Name
         *      Field name: device_name
         *      Field type: Text
         *   -  Field label: UID
         *      Field name: uid
         *      Field type: Number
         */

        // val customMetadata = mapOf("device_name" to "Emulator", "uid" to 167434)

        bitmap?.let {
            loadingDialog = AlertDialog.Builder(this)
                .setMessage("Uploading image...")
                .setCancelable(false)
                .show()

                lifecycleScope.launch {
                    val filename = "icLauncher.png"
                    val authToken = viewModel.getUploadToken(
                        mapOf(
                            "fileName" to filename,
                            "useUniqueFileName" to "true",
                            "tags" to tags.joinToString(","),
                            "folder" to targetFolder,
                            "extensions" to Gson().toJson(extensions),
                            "overwriteAITags" to overwriteAITags.toString(),
                            // "customMetadata" to Gson().toJson(customMetadata)
                        )
                    )?.let { it["token"] }.toString()

                    ImageKit.getInstance().uploader().upload(
                        file = it,
                        token = authToken,
                        fileName = filename,
                        useUniqueFileName = true,
                        tags = tags,
                        folder = targetFolder,
                        extensions = extensions,
                        overwriteAITags = overwriteAITags,
                        // customMetadata = customMetadata,
                        preprocessor = ImageUploadPreprocessor.Builder()
                            .limit(100, 100)
                            .crop(Point(10, 20), Point(40, 45))
                            .rotate(45f)
                            .build(),
                        imageKitCallback = this@UploadImageActivity
                    )
                }
        }
    }

    override fun onActivityResult(reqCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(reqCode, resultCode, data)


        if (resultCode == Activity.RESULT_OK) {
            try {
                val imageUri = data!!.data
                val imageStream = contentResolver.openInputStream(imageUri!!)
                val selectedImage = BitmapFactory.decodeStream(imageStream)
                binding?.ivImage?.setImageBitmap(selectedImage)

                bitmap = selectedImage
                binding?.btUpload?.visibility = View.VISIBLE
            } catch (e: FileNotFoundException) {
                e.printStackTrace()
                Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show()
            }

        } else {
            Toast.makeText(this, "You haven't picked Image", Toast.LENGTH_LONG).show()
        }
    }

    override fun onError(uploadError: UploadError) {
        Log.d(MainActivity::class.simpleName, "ERROR")
        loadingDialog?.dismiss()
        uploadResultDialog = AlertDialog.Builder(this)
            .setTitle("Upload Failed")
            .setMessage("Error: ${uploadError.message}")
            .setNeutralButton("Ok") { _, _ ->
                // Do nothing
            }.show()
    }

    override fun onSuccess(uploadResponse: UploadResponse) {
        Log.d(MainActivity::class.simpleName, "SUCCESS")
        loadingDialog?.dismiss()

        uploadResultDialog = AlertDialog.Builder(this)
            .setTitle("Upload Complete")
            .setMessage("The uploaded image can be accessed using url: ${uploadResponse.url}")
            .setNeutralButton("Ok") { _, _ ->
                // Do nothing
            }.show()
    }

    override fun onDestroy() {
        super.onDestroy()
        loadingDialog?.dismiss()
        uploadResultDialog?.dismiss()
    }
}
