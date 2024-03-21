package io.imagekit.imagekitdemo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import coil.Coil
import com.example.imagekit.android.coil_extension.createWithCoil
import com.example.imagekit.android.fresco_extension.buildWithTarget
import com.example.imagekit.android.fresco_extension.createWithFresco
import com.example.imagekit.android.picasso_extension.createWithPicasso
import com.imagekit.android.ImageKit
import com.imagekit.android.glide_extension.createWithGlide
import io.imagekit.imagekitdemo.databinding.ActivityImageExtensionsBinding

class ImageExtensionsActivity : AppCompatActivity() {
    private var binding: ActivityImageExtensionsBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityImageExtensionsBinding.inflate(layoutInflater)
        setContentView(binding?.root)
        var urlConstructor = ImageKit.getInstance().url(path = SAMPLE_IMAGE)
        binding?.run {
            btGlide.setOnClickListener {
                ivImage2.isVisible = true
                ivDrawee.isVisible = false
                urlConstructor.createWithGlide(
                    placeholderImage = getDrawable(R.drawable.ic_launcher_background)
                )
                    .into(ivImage2)
            }
            btPicasso.setOnClickListener {
                ivImage2.isVisible = true
                ivDrawee.isVisible = false
                urlConstructor.createWithPicasso(
                    errorImage = getDrawable(R.drawable.ic_launcher_background)
                )
                    .into(ivImage2)
            }
            btCoil.setOnClickListener {
                ivImage2.isVisible = true
                ivDrawee.isVisible = false
                Coil.imageLoader(this@ImageExtensionsActivity)
                    .enqueue(
                        urlConstructor.createWithCoil(
                            placeholderImage = getDrawable(R.drawable.ic_launcher_background)
                        )
                            .target(ivImage2)
                            .build()
                    )
            }
            btFresco.setOnClickListener {
                ivImage2.isVisible = false
                ivDrawee.isVisible = true
                urlConstructor.createWithFresco()
                    .buildWithTarget(ivDrawee)
            }
        }
    }
}