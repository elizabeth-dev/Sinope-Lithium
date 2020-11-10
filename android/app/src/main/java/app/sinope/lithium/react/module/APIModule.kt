package app.sinope.lithium.react.module

import app.sinope.lithium.infrastructure.AuthClient
import app.sinope.lithium.model.auth.LoginRequest
import app.sinope.lithium.network.APIUrlRequestCallback
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import org.chromium.net.CronetEngine
import java.util.concurrent.Executors

class APIModule constructor(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
    private val cronetEngine = CronetEngine.Builder(context).build()
    private val executor = Executors.newSingleThreadExecutor()

    private val authClient = AuthClient(this.cronetEngine, executor)

    override fun getName(): String = "APIModule"

    @ReactMethod
    fun login(email: String, password: String) {
        val loginRequest = LoginRequest()
        loginRequest.email = email
        loginRequest.password = password

        authClient.login(loginRequest)
    }
}
