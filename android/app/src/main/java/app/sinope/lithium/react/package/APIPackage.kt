package app.sinope.lithium.react.`package`

import android.view.View
import app.sinope.lithium.react.module.APIModule
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.*

class APIPackage : ReactPackage {
	override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
		val modules: MutableList<NativeModule> = ArrayList()

		modules.add(APIModule(reactContext))

		return modules
	}

	override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> =
		Collections.emptyList()
}
