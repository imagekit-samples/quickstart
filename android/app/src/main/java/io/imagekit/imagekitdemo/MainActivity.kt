package io.imagekit.imagekitdemo

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.imagekit.android.ImageKit
import com.imagekit.android.entity.TransformationPosition

import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        ImageKit.init(
            context = applicationContext,
            publicKey = "public_K0hLzl8KvshMKkSvKsEGxMSf5SI=",
            urlEndpoint = "https://ik.imagekit.io/demo",
            transformationPosition = TransformationPosition.PATH,
            authenticationEndpoint = "http://localhost:8080/auth"
        )

        btUrlConstruct.setOnClickListener{
            startActivity(Intent(this@MainActivity, FetchImageActivity::class.java))
        }

        btUploadImage.setOnClickListener{
            startActivity(Intent(this@MainActivity, UploadImageActivity::class.java))
        }

        btUploadFile.setOnClickListener {
            startActivity(Intent(this@MainActivity, UploadFileActivity::class.java))
        }


    }

}
