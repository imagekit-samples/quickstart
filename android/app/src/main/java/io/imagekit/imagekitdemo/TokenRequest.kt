package io.imagekit.imagekitdemo

data class TokenRequest(
    private val uploadPayload: Map<String, Any>,
    private val expire: Int,
    private val publicKey: String
)
