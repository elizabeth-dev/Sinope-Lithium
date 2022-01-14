package app.sinope.lithium.ui.view.login

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

val padding = 16.dp

@Composable
fun LoginScreen(onLogin: (String, String) -> Unit) {
	val (email, setEmail) = remember { mutableStateOf("") }
	val (password, setPassword) = remember { mutableStateOf("") }

	Surface(Modifier.fillMaxSize()) {
		Column(
			Modifier.wrapContentSize(Alignment.Center),
			horizontalAlignment = Alignment.CenterHorizontally,
			verticalArrangement = Arrangement.Center
		) {
			TextField(value = email, onValueChange = { setEmail(it) })
			Spacer(Modifier.size(padding))
			TextField(value = password, onValueChange = { setPassword(it) })
			Spacer(Modifier.size(padding))
			Button(
				modifier = Modifier.align(Alignment.End),
				onClick = { onLogin(email, password) }) {
				Text("Login", style = MaterialTheme.typography.button)
			}
		}
	}
}

@Composable
@Preview
fun PreviewLoginScreen() {
	LoginScreen(onLogin = { _: String, _: String -> })
}
