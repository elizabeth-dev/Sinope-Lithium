package app.sinope.lithium.ui.view.login

import androidx.lifecycle.ViewModel

sealed interface LoginUiState {
	val isLoading: Boolean
	val errorMessages: List<String>
}

class LoginViewModelState(
	val isLoading: Boolean = false,
	val errorMessages: List<String> = emptyList(),
) {}

class LoginViewModel() : ViewModel() {

	fun login(email: String, password: String) {
	}
}
