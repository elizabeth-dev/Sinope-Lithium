package app.sinope.lithium.ui.molecule.slim_post

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Star
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import app.sinope.lithium.R

@Composable
fun SlimPost(
	name: String,
	tag: String,
	content: String,
	question: String?,
	questionAuthor: String?

) {
	Surface(color = MaterialTheme.colors.surface) {
		Column(Modifier.padding(8.dp, 8.dp, 8.dp, 0.dp)) {
			if (question != null) {
				Row(modifier = Modifier.padding(4.dp)) {
					Column {
						Text(question, style = MaterialTheme.typography.body1)
						Text(
							"—— " + (questionAuthor ?: "Anonymous"), style = MaterialTheme
								.typography
								.subtitle1, color = Color.Gray
						)
					}
				}
			}
			Row(Modifier.padding(4.dp)) {
				Image(
					painter = painterResource(id = R.drawable.ic_launcher_background),
					contentDescription =
					"Avatar",
					modifier = Modifier
						.size(48.dp)
						.clip(CircleShape)
				)
				Column(modifier = Modifier.padding(8.dp, 0.dp)) {
					Text(name, style = MaterialTheme.typography.h6)
					Text("@$tag", style = MaterialTheme.typography.subtitle1, color = Color.Gray)
				}
			}
			Text(
				content, style = MaterialTheme.typography.body1, modifier = Modifier.padding(
					8.dp, 4.dp
				)
			)
			Row(horizontalArrangement = Arrangement.SpaceBetween) {
				Button(
					colors = ButtonDefaults.buttonColors(
						backgroundColor = MaterialTheme.colors.surface,
						contentColor = Color.Gray
					),
					onClick = { /*TODO*/ },
					elevation = null
				) {
					Icon(
						Icons.Filled.Send,
						contentDescription = null,
						modifier = Modifier.size(ButtonDefaults.IconSize)
					)
					Spacer(Modifier.size(ButtonDefaults.IconSpacing))
					Text("0")
				}
				Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
					Button(
						colors = ButtonDefaults.buttonColors(
							backgroundColor = MaterialTheme.colors.surface,
							contentColor = Color.Gray
						),
						onClick = { /*TODO*/ },
						elevation = null
					) {
						Icon(
							Icons.Filled.Star,
							contentDescription = null,
							modifier = Modifier.size(ButtonDefaults.IconSize)
						)
						Spacer(Modifier.size(ButtonDefaults.IconSpacing))
						Text("0")
					}
					Button(
						colors = ButtonDefaults.buttonColors(
							backgroundColor = MaterialTheme.colors.surface,
							contentColor = Color.Gray
						),
						onClick = { /*TODO*/ },
						elevation = null
					) {
						Icon(
							Icons.Filled.Share,
							contentDescription = null,
							modifier = Modifier.size(ButtonDefaults.IconSize)
						)
						Spacer(Modifier.size(ButtonDefaults.IconSpacing))
						Text("0")
					}
				}
			}
		}
	}
}

@Preview
@Composable
fun PreviewSlimPost() {
	SlimPost(
		"Elizabeth",
		"elizabeth",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at est id felis dignissim dapibus. Proin nec risus et nibh consequat dictum. Quisque vel libero ac ante gravida suscipit. Nulla eget nisi felis. Aliquam sed dignissim metus. Vivamus varius vestibulum urna eget maximus. In vitae amet.",
		"Test question",
		null
	)
}
