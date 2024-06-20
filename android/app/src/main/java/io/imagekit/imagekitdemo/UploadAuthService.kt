package io.imagekit.imagekitdemo

import retrofit2.http.Body
import retrofit2.http.POST

interface UploadAuthService {
    @POST(AUTH_API_ENDPOINT)
    suspend fun generateUploadAuthToken(@Body body: TokenRequest): Map<String, String>
}