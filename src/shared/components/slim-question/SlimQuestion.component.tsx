import React from 'react';
import { SlimQuestionStyles as styles } from './SlimQuestion.styles';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Typography } from '../typography/Typography.component';
import { FullQuestion } from '../../types/entities/question.interface';
import { Avatar } from '../avatar/Avatar.component';
import { Colors } from 'react-native-paper';
import { IconButton } from '../icon-button/IconButton.component';
import { Navigation } from 'react-native-navigation';
import { profileScreenLayer } from '../../navigation/layers/profile-screen.layer';
import { composeScreenLayer } from '../../navigation/layers/compose-screen.layer';

const onClick = () => {
	ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
};

export interface SlimQuestionProps {
	question: FullQuestion;
	stackId: string;
}

export const SlimQuestion: React.FC<SlimQuestionProps> = ({ question, stackId }) => {
	const name = question.from?.name ?? 'Anonymous';

	const onQuestionClick = () => Navigation.push(stackId, composeScreenLayer(undefined, question.id));
	const onAvatarClick = () => question.from && Navigation.push(stackId, profileScreenLayer(question.from.id));

	return (<TouchableHighlight
		underlayColor={Colors.grey200}
		onPress={onQuestionClick}
	>
		<View style={styles.root}>
			<Avatar
				style={styles.avatar}
				label={name[0].toUpperCase()}
				onPress={onAvatarClick}
			/>
			<View style={styles.body}>
				<View style={styles.header}>
					<View style={styles.userData}>
						<Typography.Headline>{name}</Typography.Headline>
					</View>
					<IconButton
						icon="dots-vertical"
						size={24}
						onPress={onClick}
						style={styles.menuButton}
					/>
				</View>
				<View>
					<Typography.Body>{question.content}</Typography.Body>
					<Typography.Caption>{question.date.toLocaleString()}</Typography.Caption>
				</View>
			</View>
		</View>
	</TouchableHighlight>);
};
