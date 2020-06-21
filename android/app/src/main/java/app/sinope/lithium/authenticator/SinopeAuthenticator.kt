package app.sinope.lithium.authenticator

import android.accounts.AbstractAccountAuthenticator
import android.accounts.Account
import android.accounts.AccountAuthenticatorResponse
import android.accounts.AccountManager
import android.content.Context
import android.os.Bundle
import app.sinope.lithium.values.Constants
import java.time.Instant


class SinopeAuthenticator(private val context: Context) : AbstractAccountAuthenticator(context) {

    // No additional accounts permitted
    override fun addAccount(response: AccountAuthenticatorResponse,
                            accType: String,
                            tokenType: String?,
                            requiredFeatures: Array<out String>?,
                            options: Bundle?): Bundle? = null

    // TODO: Implement AccountSettings activity
    override fun editProperties(response: AccountAuthenticatorResponse, accType: String): Bundle {
        throw UnsupportedOperationException()
    }

    override fun confirmCredentials(
            r: AccountAuthenticatorResponse,
            account: Account,
            bundle: Bundle
    ): Bundle? = null

    override fun getAuthToken(response: AccountAuthenticatorResponse,
                              account: Account,
                              tokenType: String,
                              options: Bundle): Bundle? {
        if (tokenType != Constants.AUTH_TOKEN_TYPE) {
            val result = Bundle()
            result.putString(AccountManager.KEY_ERROR_MESSAGE, "Requested token type not supported")

            return result
        }

        val am = AccountManager.get(this.context)
        val refreshToken = am.getPassword(account)

        if (refreshToken == null) {
            val result = Bundle()
            result.putString(AccountManager.KEY_ERROR_MESSAGE, "No refresh token found")

            return result
        }

        Thread {
            Thread.sleep(3000)

            val result = Bundle()
            result.putString(AccountManager.KEY_ACCOUNT_NAME, account.name)
            result.putString(AccountManager.KEY_ACCOUNT_TYPE, account.type)
            result.putString(AccountManager.KEY_AUTHTOKEN, "authToken")
            result.putLong(AbstractAccountAuthenticator.KEY_CUSTOM_TOKEN_EXPIRY, Instant.now().epochSecond + 180)

            response.onResult(result)
        }

        return null
    }

    override fun getAuthTokenLabel(tokenType: String): String {
        throw UnsupportedOperationException()
    }

    override fun updateCredentials(response: AccountAuthenticatorResponse,
                                   account: Account,
                                   tokenType: String,
                                   options: Bundle): Bundle {
        throw UnsupportedOperationException()
    }

    override fun hasFeatures(response: AccountAuthenticatorResponse,
                             account: Account,
                             features: Array<out String>): Bundle {
        val result = Bundle()
        result.putBoolean(AccountManager.KEY_BOOLEAN_RESULT, false)

        return result
    }
}