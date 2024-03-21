package io.imagekit.imagekitdemo

import android.content.ContentResolver
import android.content.ContentUris
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.database.DatabaseUtils
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.DocumentsContract
import android.provider.MediaStore
import android.util.Log
import android.webkit.MimeTypeMap
import java.io.File
import java.io.FileFilter
import java.text.DecimalFormat
import java.util.Comparator

object FileUtils {

    internal val TAG = "FileUtils"
    private val DEBUG = false

    val MIME_TYPE_AUDIO = "audio/*"
    val MIME_TYPE_TEXT = "text/*"
    val MIME_TYPE_IMAGE = "image/*"
    val MIME_TYPE_VIDEO = "video/*"
    val MIME_TYPE_APP = "application/*"

    val HIDDEN_PREFIX = "."

    var sComparator:Comparator<File> = Comparator<File> { f1, f2 ->
        f1.name.toLowerCase().compareTo(
            f2.name.toLowerCase())
    }

    var sFileFilter:FileFilter = FileFilter { file ->
        val fileName = file.name
        file.isFile && !fileName.startsWith(HIDDEN_PREFIX)
    }

    var sDirFilter:FileFilter = FileFilter { file ->
        val fileName = file.name
        file.isDirectory && !fileName.startsWith(HIDDEN_PREFIX)
    }

    fun getExtension(uri:String?):String? {
        if (uri == null)
        {
            return null
        }

        val dot = uri!!.lastIndexOf(".")
        return if (dot >= 0) {
            uri!!.substring(dot)
        } else {
            ""
        }
    }

    fun isLocal(url:String?):Boolean {
        return url != null && !url!!.startsWith("http://") && !url!!.startsWith("https://")
    }

    fun isMediaUri(uri:Uri):Boolean {
        return "media".equals(uri.authority!!, ignoreCase = true)
    }

    fun getUri(file:File?):Uri? {
        return if (file != null) {
            Uri.fromFile(file)
        } else null
    }

    fun getPathWithoutFilename(file:File?):File? {
        if (file != null)
        {
            if (file!!.isDirectory)
            {
                return file
            }
            else
            {
                val filename = file!!.name
                val filepath = file!!.absolutePath

                var pathwithoutname = filepath.substring(0,
                    filepath.length - filename.length)
                if (pathwithoutname.endsWith("/"))
                {
                    pathwithoutname = pathwithoutname.substring(0, pathwithoutname.length - 1)
                }
                return File(pathwithoutname)
            }
        }
        return null
    }

    fun getMimeType(file:File):String? {

        val extension = getExtension(file.name)

        return if (extension!!.length > 0) MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension!!.substring(1)) else "application/octet-stream"

    }

    fun getMimeType(context:Context, uri:Uri):String? {
        val file = File(getPath(context, uri)!!)
        return getMimeType(file)
    }

    fun isLocalStorageDocument(uri:Uri):Boolean {
        return "com.ianhanniballake.localstorage.documents" == uri.authority
    }

    fun isExternalStorageDocument(uri:Uri):Boolean {
        return "com.android.externalstorage.documents" == uri.authority
    }

    fun isDownloadsDocument(uri:Uri):Boolean {
        return "com.android.providers.downloads.documents" == uri.authority
    }

    fun isMediaDocument(uri:Uri):Boolean {
        return "com.android.providers.media.documents" == uri.authority
    }

    fun isGooglePhotosUri(uri:Uri):Boolean {
        return "com.google.android.apps.photos.content" == uri.authority
    }

    fun getDataColumn(context:Context, uri:Uri?, selection:String?,
                      selectionArgs:Array<String>?):String? {

        var cursor:Cursor? = null
        val column = "_data"
        val projection = arrayOf(column)

        try
        {
            cursor = context.contentResolver.query(uri!!, projection, selection, selectionArgs, null)
            if (cursor != null && cursor!!.moveToFirst())
            {
                if (DEBUG)
                    DatabaseUtils.dumpCursor(cursor)

                val column_index = cursor!!.getColumnIndexOrThrow(column)
                return cursor!!.getString(column_index)
            }
        }

        finally
        {
            if (cursor != null)
                cursor!!.close()
        }
        return null
    }

    fun getPath(context:Context, uri:Uri):String? {

        if (DEBUG)
            Log.d(
                "$TAG File -",
                "Authority: " + uri.authority +
                        ", Fragment: " + uri.fragment +
                        ", Port: " + uri.port +
                        ", Query: " + uri.query +
                        ", Scheme: " + uri.scheme +
                        ", Host: " + uri.host +
                        ", Segments: " + uri.pathSegments.toString()
            )

        val isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT

        if (isKitKat && DocumentsContract.isDocumentUri(context, uri))
        {
            if (isLocalStorageDocument(uri))
            {
                return DocumentsContract.getDocumentId(uri)
            }
            else if (isExternalStorageDocument(uri))
            {
                val docId = DocumentsContract.getDocumentId(uri)
                val split = docId.split((":").toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                val type = split[0]

                if ("primary".equals(type, ignoreCase = true))
                {
                    return (Environment.getExternalStorageDirectory()).toString() + "/" + split[1]
                }

            }
            else if (isDownloadsDocument(uri))
            {
                val fileName = getFilePath(context, uri)
                if (fileName != null)
                {
                    return Environment.getExternalStorageDirectory().toString() + "/Download/" + fileName
                }

                var id = DocumentsContract.getDocumentId(uri)
                if (id.startsWith("raw:"))
                {
                    id = id.replaceFirst(("raw:").toRegex(), "")
                    val file = File(id)
                    if (file.exists())
                        return id
                }

                val contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"), java.lang.Long.valueOf(id))
                return getDataColumn(context, contentUri, null, null)
            }
            else if (isMediaDocument(uri))
            {
                val docId = DocumentsContract.getDocumentId(uri)
                val split = docId.split((":").toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                val type = split[0]

                var contentUri:Uri? = null
                if ("image" == type)
                {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
                }
                else if ("video" == type)
                {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI
                }
                else if ("audio" == type)
                {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
                }

                val selection = "_id=?"
                val selectionArgs = arrayOf(split[1])

                return getDataColumn(context, contentUri, selection, selectionArgs)
            }
        }
        else if ("content".equals(uri.scheme!!, ignoreCase = true))
        {

            return if (isGooglePhotosUri(uri)) uri.lastPathSegment else getDataColumn(context, uri, null, null)

        }
        else if ("file".equals(uri.scheme!!, ignoreCase = true))
        {
            return uri.path
        }

        return null
    }

    fun getFile(context:Context, uri:Uri?):File? {
        if (uri != null)
        {
            val path = getPath(context, uri)
            if (path != null && isLocal(path))
            {
                return File(path!!)
            }
        }
        return null
    }

    fun getReadableFileSize(size:Int):String {
        val BYTES_IN_KILOBYTES = 1024
        val dec = DecimalFormat("###.#")
        val KILOBYTES = " KB"
        val MEGABYTES = " MB"
        val GIGABYTES = " GB"
        var fileSize = 0f
        var suffix = KILOBYTES

        if (size > BYTES_IN_KILOBYTES)
        {
            fileSize = (size / BYTES_IN_KILOBYTES).toFloat()
            if (fileSize > BYTES_IN_KILOBYTES)
            {
                fileSize = fileSize / BYTES_IN_KILOBYTES
                if (fileSize > BYTES_IN_KILOBYTES)
                {
                    fileSize = fileSize / BYTES_IN_KILOBYTES
                    suffix = GIGABYTES
                }
                else
                {
                    suffix = MEGABYTES
                }
            }
        }
        return dec.format(fileSize.toDouble()) + suffix
    }

    fun getThumbnail(context:Context, file:File):Bitmap? {
        return getThumbnail(context, getUri(file)!!, getMimeType(file))
    }

    @JvmOverloads  fun getThumbnail(context:Context, uri:Uri, mimeType:String? = getMimeType(context, uri)):Bitmap? {
        if (DEBUG)
            Log.d(TAG, "Attempting to get thumbnail")

        if (!isMediaUri(uri!!))
        {
            Log.e(TAG, "You can only retrieve thumbnails for images and videos.")
            return null
        }

        var bm:Bitmap? = null
        if (uri != null)
        {
            val resolver = context.contentResolver
            var cursor:Cursor? = null
            try
            {
                cursor = resolver.query(uri!!, null, null, null, null)
                if (cursor!!.moveToFirst())
                {
                    val id = cursor!!.getInt(0)
                    if (DEBUG)
                        Log.d(TAG, "Got thumb ID: $id")

                    if (mimeType!!.contains("video"))
                    {
                        bm = MediaStore.Video.Thumbnails.getThumbnail(
                            resolver,
                            id.toLong(),
                            MediaStore.Video.Thumbnails.MINI_KIND, null)
                    }
                    else if (mimeType!!.contains(FileUtils.MIME_TYPE_IMAGE))
                    {
                        bm = MediaStore.Images.Thumbnails.getThumbnail(
                            resolver,
                            id.toLong(),
                            MediaStore.Images.Thumbnails.MINI_KIND, null)
                    }
                }
            }
            catch (e:Exception) {
                if (DEBUG)
                    Log.e(TAG, "getThumbnail", e)
            }
            finally
            {
                if (cursor != null)
                    cursor!!.close()
            }
        }
        return bm
    }

    fun createGetContentIntent():Intent {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "*/*"
        intent.addCategory(Intent.CATEGORY_OPENABLE)
        return intent
    }

    private fun getFilePath(context:Context, uri:Uri):String? {

        var cursor:Cursor? = null
        val projection = arrayOf(MediaStore.MediaColumns.DISPLAY_NAME)

        try
        {
            cursor = context.contentResolver.query(uri, projection, null, null, null)
            if (cursor != null && cursor!!.moveToFirst())
            {
                val index = cursor!!.getColumnIndexOrThrow(MediaStore.MediaColumns.DISPLAY_NAME)
                return cursor!!.getString(index)
            }
        }

        finally
        {
            if (cursor != null)
                cursor!!.close()
        }
        return null
    }
}