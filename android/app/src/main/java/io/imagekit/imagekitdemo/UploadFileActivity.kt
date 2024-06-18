package io.imagekit.imagekitdemo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.gson.Gson
import com.imagekit.android.ImageKit
import com.imagekit.android.ImageKitCallback
import com.imagekit.android.entity.UploadError
import com.imagekit.android.entity.UploadPolicy
import com.imagekit.android.entity.UploadResponse
import com.imagekit.android.preprocess.VideoUploadPreprocessor
import io.imagekit.imagekitdemo.databinding.ActivityUploadFileBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
import java.io.File


class UploadFileActivity : AppCompatActivity(), ImageKitCallback, View.OnClickListener {

    private var uploadResultDialog: AlertDialog? = null
    private var loadingDialog: AlertDialog? = null

    private var file: File? = null

    private var binding: ActivityUploadFileBinding? = null
    private val viewModel: UploadAuthViewModel by viewModels()

    override fun onClick(v: View?) {
        val intent = Intent().setType("*/*").setAction(Intent.ACTION_GET_CONTENT)
        startActivityForResult(Intent.createChooser(intent, "Select a file"), 24)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 24 && resultCode == RESULT_OK) {
            val selectedFile = data?.data
            if (selectedFile != null) {
                file = File("${externalCacheDir?.path}/${selectedFile.path?.split("/")?.last()}")
                lifecycleScope.launch {
                    async(Dispatchers.IO) {
                        contentResolver.openInputStream(selectedFile)?.use { input ->
                            file?.outputStream()?.use { output ->
                                output.write(input.readBytes())
                            }
                        }
                    }.await()
                    uploadFile()
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUploadFileBinding.inflate(layoutInflater)
        setContentView(binding?.root)
        binding?.btUpload?.setOnClickListener(this)
    }

    private fun uploadFile() {
        val tags = arrayOf("nice", "copy", "books")
        val targetFolder = "/dummy/folder/"
        val extensions = listOf(
            mapOf("name" to "remove-bg", "options" to mapOf("add_shadow" to true)),
            mapOf("name" to "google-auto-tagging", "minConfidence" to 80, "maxTags" to 5),
        )
        val overwriteAITags = false
        val customMetadata = mapOf("device_name" to "Emulator", "uid" to 167434)
        file?.let {
            loadingDialog = AlertDialog.Builder(this)
                .setMessage("Uploading file...")
                .setCancelable(false)
                .show()

            val isVideo = FileUtils.getMimeType(it)?.startsWith("video") ?: false

                lifecycleScope.launch {
                    val authToken = viewModel.getUploadToken(
                        mapOf(
                            "fileName" to it.name,
                            "useUniqueFileName" to "true",
                            "tags" to tags.joinToString(","),
                            "folder" to targetFolder,
                            "extensions" to Gson().toJson(extensions),
                            "overwriteAITags" to overwriteAITags.toString(),
                            "customMetadata" to Gson().toJson(customMetadata)
                        )
                    )?.let { response -> response["token"] }.toString()

                    ImageKit.getInstance().uploader().upload(
                        file = it,
                        token = authToken,
                        fileName = it.name,
                        useUniqueFileName = true,
                        tags = tags,
                        folder = targetFolder,
                        extensions = extensions,
                        overwriteAITags = false,
                        customMetadata = customMetadata,
                        policy = UploadPolicy.Builder()
                            .requireNetworkType(UploadPolicy.NetworkType.UNMETERED)
                            .maxRetries(3)
                            .backoffCriteria(
                                backoffMillis = 200L,
                                backoffPolicy = UploadPolicy.BackoffPolicy.EXPONENTIAL
                            )
                            .build(),
                        preprocessor = if (isVideo) VideoUploadPreprocessor.Builder()
                            .limit(400, 300)
                            .frameRate(25)
                            .build()
                        else null,
                        imageKitCallback = this@UploadFileActivity
                    )
                }
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
            .setMessage("The uploaded file can be accessed using url: ${uploadResponse.url}")
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
