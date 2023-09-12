package io.imagekit.imagekitdemo

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class UploadAuthViewModel : ViewModel() {
    private val service: UploadAuthService = Retrofit.Builder()
        .baseUrl("AUTH_SERVER_URL")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(UploadAuthService::class.java)

    suspend fun getUploadToken(payload: Map<String, Any>): Map<String, String>? =
        withContext(context = viewModelScope.coroutineContext + Dispatchers.IO) {
            try {
                service.generateUploadAuthToken(
                    TokenRequest(
                        uploadPayload = payload,
                        expire = 60,
                        publicKey = "IK_PUBLIC_KEY"
                    )
                )
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
        }
}