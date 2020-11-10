package app.sinope.lithium.network

import android.util.Log
import org.chromium.net.CronetException
import org.chromium.net.UrlRequest
import org.chromium.net.UrlResponseInfo
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.nio.ByteBuffer
import java.nio.channels.Channels
import java.nio.channels.WritableByteChannel

private const val TAG = "APIUrlRequestCallback"

class APIUrlRequestCallback: UrlRequest.Callback() {
	private val bytesReceived: ByteArrayOutputStream = ByteArrayOutputStream()
	private val receiveChannel: WritableByteChannel = Channels.newChannel(bytesReceived)

	override fun onRedirectReceived(request: UrlRequest?, info: UrlResponseInfo?, newLocationUrl: String?) {
		Log.w(TAG, "Sinope API redirects are not allowed. Target: $newLocationUrl")
		request?.cancel()
	}

	override fun onResponseStarted(request: UrlRequest?, info: UrlResponseInfo?) {
		request?.read(ByteBuffer.allocateDirect(102400))
	}

	override fun onReadCompleted(request: UrlRequest?, info: UrlResponseInfo?, byteBuffer: ByteBuffer?) {
		byteBuffer?.flip()

		try {
			this.receiveChannel.write(byteBuffer)
		} catch (e: IOException) {
			Log.e(TAG, "IOException reading ByteBuffer. Details: ", e)
		}

		byteBuffer?.clear()
		request?.read(byteBuffer)
	}

	override fun onSucceeded(request: UrlRequest?, info: UrlResponseInfo?) {
		TODO("Not yet implemented")
	}

	override fun onFailed(request: UrlRequest?, info: UrlResponseInfo?, error: CronetException?) {
		TODO("Not yet implemented")
	}
}
