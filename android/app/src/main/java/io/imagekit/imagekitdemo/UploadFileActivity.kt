package io.imagekit.imagekitdemo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.imagekit.android.ImageKit
import com.imagekit.android.ImageKitCallback
import com.imagekit.android.entity.UploadError
import com.imagekit.android.entity.UploadResponse
import io.imagekit.imagekitdemo.databinding.ActivityUploadFileBinding
import java.io.*


class UploadFileActivity : AppCompatActivity(), ImageKitCallback, View.OnClickListener {

    private var uploadResultDialog: AlertDialog? = null
    private var loadingDialog: AlertDialog? = null

    private var file: File? = null

    private var binding: ActivityUploadFileBinding? = null

    override fun onClick(v: View?) {
        val intent = Intent().setType("*/*").setAction(Intent.ACTION_GET_CONTENT)
        startActivityForResult(Intent.createChooser(intent, "Select a file"), 24)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 24 && resultCode == RESULT_OK) {
            val selectedFile = data?.data
            if (selectedFile != null){
                file = FileUtils.getPath(this, selectedFile)?.let { File(it) }
                uploadFile()
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
        file?.let {
            loadingDialog = AlertDialog.Builder(this)
                .setMessage("Uploading file...")
                .setCancelable(false)
                .show()


            ImageKit.getInstance().uploader().upload(
                file = file!!,
                token = "",
                fileName = file!!.name,
                useUniqueFileName = true,
                tags = arrayOf("nice", "copy", "books"),
                folder = "/dummy/folder/",
                imageKitCallback = this
            )
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
