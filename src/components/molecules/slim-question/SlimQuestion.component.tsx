import { Avatar } from '@atoms/avatar/Avatar.component';
import { IconButton } from '@atoms/icon-button/IconButton.component';
import { Typography } from '@atoms/typography/Typography.component';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { FullQuestion } from '@shared/types/entities/question.interface';
import { dateFormatter } from '@shared/utils/dates.utils';
import { colors } from '@theme/colors';
import React from 'react';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SlimQuestionStyles as styles } from './SlimQuestion.styles';

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

	return (
		<TouchableHighlight underlayColor={colors.grey200} onPress={onQuestionClick}>
			<View style={styles.root}>
				<Avatar style={styles.avatar} label={name[0].toUpperCase()} onPress={onAvatarClick} />
				<View style={styles.body}>
					<View style={styles.header}>
						<View style={styles.userData}>
							<Typography.Headline>{name}</Typography.Headline>
						</View>
						<IconButton icon="dots-vertical" size={24} onPress={onClick} style={styles.menuButton} />
					</View>
					<View style={styles.content}>
						<Typography.Body>{question.content}</Typography.Body>
						<Typography.Caption>{dateFormatter(question.date)}</Typography.Caption>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};
