package app.sinope.lithium.ui.view.dashboard

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun DashboardScreen() {
    val (tab, setTab) = remember { mutableStateOf(0) }
    val tabTitles = listOf("TAB 1", "TAB 2")

    Scaffold(topBar = {
        TopAppBar(title = { Text("Test") }, elevation = 0.dp)
    }, floatingActionButton = {
        FloatingActionButton(onClick = { /*TODO*/ }) {
            Icon(Icons.Filled.Add, contentDescription = "Compose a post")
        }
    }) {
        Column(Modifier.padding(it)) {
            TabRow(selectedTabIndex = tab) {
                tabTitles.forEachIndexed { i, title ->
                    Tab(selected = tab == i, onClick = { setTab(i) }, text = {
                        Text(title)
                    })
                }
            }
        }
    }
}

@Composable
@Preview
fun PreviewDashboardScreen() {
	DashboardScreen()
}