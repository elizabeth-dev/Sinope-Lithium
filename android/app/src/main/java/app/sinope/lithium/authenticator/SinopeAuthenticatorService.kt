package app.sinope.lithium.authenticator

import android.app.Service
import android.content.Intent
import android.os.IBinder

class SinopeAuthenticatorService: Service() {
    lateinit var authenticator: SinopeAuthenticator

    override fun onCreate() {
        this.authenticator = SinopeAuthenticator(this)
    }

    override fun onBind(p0: Intent?): IBinder? {
        return this.authenticator.iBinder
    }
}