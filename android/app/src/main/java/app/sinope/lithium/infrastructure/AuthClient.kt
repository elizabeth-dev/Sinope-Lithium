package app.sinope.lithium.infrastructure

import app.sinope.lithium.model.auth.LoginRequest
import app.sinope.lithium.network.APIUploadDataProvider
import app.sinope.lithium.network.APIUrlRequestCallback
import org.chromium.net.CronetEngine
import java.util.concurrent.Executor

class AuthClient constructor(private val cronetEngine: CronetEngine, private val executor: Executor) {
	fun login(loginRequest: LoginRequest): String {
		val requestBuilder = this.cronetEngine.newUrlRequestBuilder(
			"http://localhost:8080/auth/login",
			APIUrlRequestCallback(),
			this.executor
		)
		requestBuilder.addHeader("Content-Type", "application/json; charset=UTF-8")
		requestBuilder.setHttpMethod("POST")

		requestBuilder.setUploadDataProvider(
			APIUploadDataProvider(loginRequest),
			this.executor
		)

		requestBuilder.build().start()
		return ""
	}
}
