package app.sinope.lithium.ui.view.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import app.sinope.lithium.model.Post
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

sealed interface DashboardUiState {
	val isLoading: Boolean

	data class NoPosts(
		override val isLoading: Boolean
	) : DashboardUiState

	data class HasPosts(
		override val isLoading: Boolean, val posts: List<Post>
	) : DashboardUiState
}

private data class DashboardViewModelState(val posts: List<Post>? = null, val isLoading: Boolean = false) {
	fun toUiState(): DashboardUiState = if (posts == null) DashboardUiState.NoPosts(isLoading = isLoading)
	else DashboardUiState.HasPosts(isLoading = isLoading, posts = posts)
}

class DashboardViewModel : ViewModel() {
	private val viewModelState = MutableStateFlow(DashboardViewModelState(isLoading = true))

	val uiState = viewModelState
		.map { it.toUiState() }
		.stateIn(
			viewModelScope,
			SharingStarted.Eagerly,
			viewModelState.value.toUiState()
		)
}
