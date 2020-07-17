
package app.sinope.lithium

import com.reactnativenavigation.NavigationApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.PackageList
import android.content.Context
import com.facebook.react.ReactInstanceManager
import com.reactnativenavigation.react.NavigationReactNativeHost;

import java.lang.reflect.InvocationTargetException

class MainApplication : NavigationApplication() {
	private val mReactNativeHost = object : NavigationReactNativeHost(this) {
		override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
		}
		
		override fun getPackages(): List<ReactPackage> {
			val packages = PackageList(this).packages

			// Packages that cannot be autolinked yet can be added manually here, for example:
		  	// packages.add(new MyReactNativePackage())
		  
			return packages
		}

		override fun getJSMainModuleName(): String {
			return "index";
		}
	}

	override fun getReactNativeHost(): ReactNativeHost {
		return mReactNativeHost
	}

	override fun onCreate() {
		super.onCreate()

		initializeFlipper(this, reactNativeHost.reactInstanceManager)
	}

	companion object {
		private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
			if (BuildConfig.DEBUG) {
				try {
					val aClass = Class.forName("app.sinope.lithium.ReactNativeFlipper")

					aClass.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java).invoke(null, context, reactInstanceManager)

				} catch (e: ClassNotFoundException) {
					e.printStackTrace()
				  } catch (e: NoSuchMethodException) {
					e.printStackTrace()
				  } catch (e: IllegalAccessException) {
					e.printStackTrace()
				  } catch (e: InvocationTargetException) {
					e.printStackTrace()
				  }
			}
		}
	}
}