package io.imagekit.imagekitdemo

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.imagekit.android.ImageKit
import com.imagekit.android.entity.CropMode
import com.imagekit.android.entity.FocusType
import com.imagekit.android.entity.Rotation
import com.imagekit.android.entity.TransformationPosition
import com.squareup.picasso.Picasso
import io.imagekit.imagekitdemo.databinding.ActivityFetchImageBinding

class FetchImageActivity : AppCompatActivity(), View.OnClickListener {

    private var binding: ActivityFetchImageBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFetchImageBinding.inflate(layoutInflater)
        setContentView(binding?.root)

        binding?.btTran1?.setOnClickListener(this)
        binding?.btTran2?.setOnClickListener(this)
        binding?.btTran3?.setOnClickListener(this)
        binding?.btTran4?.setOnClickListener(this)
        binding?.btTran5?.setOnClickListener(this)
        binding?.btTran6?.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        showImage(
            when (v!!.id) {
                R.id.btTran1 -> {
                    ImageKit.getInstance().url(path = "default-image.jpg")
                        .height(150)
                        .width(150)
                        .create()
                }
                R.id.btTran2 -> {
                    ImageKit.getInstance().url(
                        path = "default-image.jpg",
                        transformationPosition = TransformationPosition.QUERY
                    )
                        .height(300)
                        .width(200)
                        .cropMode(CropMode.PAD_RESIZE)
                        .background("F1F1F1")
                        .create()
                }
                R.id.btTran3 -> {
                    ImageKit.getInstance().url(
                        path = "default-image.jpg",
                        transformationPosition = TransformationPosition.PATH
                    )
                        .height(600)
                        .aspectRatio(3, 2)
                        .create()

                }
                R.id.btTran4 -> {
                    ImageKit.getInstance().url(
                        path = "default-image.jpg",
                        transformationPosition = TransformationPosition.PATH
                    )
                        .height(400)
                        .width(300)
                        .chainTransformation()
                        .aspectRatio(3, 2)
                        .rotation(Rotation.VALUE_90)
                        .create()
                }
                R.id.btTran5 -> {
                    ImageKit.getInstance().url(
                        path = "default-image.jpg",
                        transformationPosition = TransformationPosition.PATH
                    )
                        .raw("l-image,i-ik_logo.png,lx-20,ly-20,r-32,l-end")
                        .create()
                }
                R.id.btTran6 -> {
                    ImageKit.getInstance().url(
                        path = "default-image.jpg",
                        transformationPosition = TransformationPosition.PATH
                    )
                        .setResponsive(
                            binding!!.ivImage,
                            step = 50,
                            minSize = 200,
                            maxSize = 800,
                            cropMode = CropMode.PAD_RESIZE,
                            focus = FocusType.TOP
                        )
                        .create()
                }
                else ->
                    ImageKit.getInstance().url(path = "default-image.jpg")
                        .create()
            }
        )
    }

    private fun showImage(imagePath: String) {
        binding?.tvConstructedUrl?.text = "Image Url: $imagePath"

        Picasso.get()
            .load(imagePath)
            .into(binding?.ivImage)

    }
}
