package app.sinope.lithium.network

import com.google.gson.Gson
import org.chromium.net.UploadDataProvider
import org.chromium.net.UploadDataSink
import java.nio.ByteBuffer
import java.nio.charset.StandardCharsets

val gson = Gson()

class APIUploadDataProvider(rawData: Any): UploadDataProvider() {
	private val data = gson.toJson(rawData)

	override fun getLength(): Long = data.length.toLong()

	override fun read(uploadDataSink: UploadDataSink?, byteBuffer: ByteBuffer?) {
		byteBuffer!!.put(data.toByteArray(StandardCharsets.UTF_8))
		uploadDataSink!!.onReadSucceeded(false)
	}

	override fun rewind(uploadDataSink: UploadDataSink?) {
		uploadDataSink!!.onRewindSucceeded()
	}
}
