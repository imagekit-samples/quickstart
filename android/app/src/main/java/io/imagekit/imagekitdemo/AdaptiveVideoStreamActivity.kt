package io.imagekit.imagekitdemo

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.PopupMenu
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.TrackSelectionOverride
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.trackselection.AdaptiveTrackSelection
import androidx.media3.exoplayer.trackselection.DefaultTrackSelector
import androidx.media3.exoplayer.trackselection.MappingTrackSelector
import com.imagekit.android.ImageKit
import com.imagekit.android.entity.StreamingFormat
import io.imagekit.imagekitdemo.databinding.ActivityAdaptiveVideoStreamBinding

class AdaptiveVideoStreamActivity : AppCompatActivity() {
    private var qualityPopUp: PopupMenu? = null
    private lateinit var binding: ActivityAdaptiveVideoStreamBinding
    var qualityList: List<Pair<String, TrackSelectionOverride>> = listOf()
    var isInitialized: Boolean = false
    var player: ExoPlayer? = null

    @androidx.media3.common.util.UnstableApi
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAdaptiveVideoStreamBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val selector = DefaultTrackSelector(this, AdaptiveTrackSelection.Factory())
        player = ExoPlayer.Builder(this)
            .setTrackSelector(selector)
            .build()
        binding.videoPlayer.player = player
        binding.videoPlayer.controllerShowTimeoutMs = 2000
        player?.run {
            setMediaItem(
                MediaItem.fromUri(
                ImageKit.getInstance().url(path = SAMPLE_VIDEO)
                    .setAdaptiveStreaming(
                        format = StreamingFormat.DASH,
                        resolutions = listOf(360, 480, 720, 1080)
                    )
                    .create().also {
                        binding.txtVideoUrl.text = it
                    }
            ))
            addListener(object : Player.Listener {
                @SuppressLint("SetTextI18n")
                override fun onPlaybackStateChanged(playbackState: Int) {
                    if (playbackState == Player.STATE_READY) {
                        generateResolutionsList(selector).let { list ->
                            qualityList = list
                            qualityPopUp = PopupMenu(this@AdaptiveVideoStreamActivity, binding.btnQuality)
                            qualityList.let {
                                for ((i, videoQuality) in it.withIndex()) {
                                    qualityPopUp?.menu?.add(0, i, 0, videoQuality.first)
                                }
                            }
                            qualityPopUp?.setOnMenuItemClickListener { menuItem ->
                                qualityList[menuItem.itemId].let {
                                    trackSelector?.parameters = trackSelector!!.parameters
                                        .buildUpon()
                                        .clearOverridesOfType(C.TRACK_TYPE_VIDEO)
                                        .addOverride(it.second)
                                        .build()
                                    binding.txtQuality.text = "Current quality: ${it.second.mediaTrackGroup.getFormat(menuItem.itemId).height}p"
                                }
                                true
                            }
                        }
                        if (!isInitialized) {
                            player?.trackSelector?.let {
                                it.parameters = it.parameters
                                    .buildUpon()
                                    .addOverride(qualityList[0].second)
                                    .build()
                            }
                            binding.txtQuality.text = "Current quality: ${qualityList[0].second.mediaTrackGroup.getFormat(qualityList[0].second.trackIndices[0]).height}p"
                            this@run.play()
                            isInitialized = true
                        }
                    }
                }
            })
            prepare()
        }
        binding.btnQuality.setOnClickListener {
            qualityPopUp?.show()
        }
    }

    @androidx.media3.common.util.UnstableApi
    private fun isSupportedFormat(mappedTrackInfo: MappingTrackSelector.MappedTrackInfo?, rendererIndex: Int): Boolean {
        val trackGroupArray = mappedTrackInfo?.getTrackGroups(rendererIndex)
        return if (trackGroupArray?.length == 0) {
            false
        } else mappedTrackInfo?.getRendererType(rendererIndex) == C.TRACK_TYPE_VIDEO
    }

    @androidx.media3.common.util.UnstableApi
    fun generateResolutionsList(selector: DefaultTrackSelector): ArrayList<Pair<String, TrackSelectionOverride>> {
        val trackOverrideList = ArrayList<Pair<String, TrackSelectionOverride>>()
        val mappedTrackInfo: MappingTrackSelector.MappedTrackInfo? = selector.currentMappedTrackInfo
        val renderCount = mappedTrackInfo?.rendererCount ?: 0
        for (rendererIndex in 0 until renderCount) {
            if (isSupportedFormat(mappedTrackInfo, rendererIndex)) {
                val trackGroupType = mappedTrackInfo?.getRendererType(rendererIndex)
                val trackGroups = mappedTrackInfo?.getTrackGroups(rendererIndex)
                val trackGroupsCount = trackGroups?.length!!
                if (trackGroupType == C.TRACK_TYPE_VIDEO) {
                    for (groupIndex in 0 until trackGroupsCount) {
                        val videoQualityTrackCount = trackGroups[groupIndex].length
                        for (trackIndex in 0 until videoQualityTrackCount) {
                            val isTrackSupported = mappedTrackInfo.getTrackSupport(
                                rendererIndex,
                                groupIndex,
                                trackIndex
                            ) == C.FORMAT_HANDLED
                            if (isTrackSupported) {
                                val track = trackGroups[groupIndex]
                                val trackName = "${track.getFormat(trackIndex).height}p"
                                val trackBuilder = TrackSelectionOverride(track, groupIndex)
                                trackOverrideList.add(Pair(trackName, trackBuilder))
                            }
                        }
                    }
                }
            }
        }
        return trackOverrideList
    }

    override fun onStop() {
        super.onStop()
        player?.run {
            stop()
            release()
        }
    }
}