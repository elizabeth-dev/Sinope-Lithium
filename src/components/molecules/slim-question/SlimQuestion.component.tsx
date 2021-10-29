import { Avatar } from '@atoms/avatar/Avatar.component';
import { IconButton } from '@atoms/icon-button/IconButton.component';
import { Typography } from '@atoms/typography/Typography.component';
import { FullQuestion } from '@shared/types/entities/question.interface';
import { dateFormatter } from '@shared/utils/dates.utils';
import { colors } from '@theme/colors';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SlimQuestionStyles as styles } from './SlimQuestion.styles';

export interface SlimQuestionProps {
	question: FullQuestion;
	onQuestionAnswer: (questionId: string) => void;
	onProfileNav: (profileId: string) => void;
}

export const SlimQuestion: React.FC<SlimQuestionProps> = ({ question, onQuestionAnswer, onProfileNav }) => {
	const name = question.from?.name ?? 'Anonymous';

	return (
		<TouchableHighlight underlayColor={colors.grey200} onPress={() => onQuestionAnswer(question.id)}>
			<View style={styles.root}>
				<Avatar
					style={styles.avatar}
					label={name[0].toUpperCase()}
					onPress={() => (question.from ? onProfileNav(question.from.id) : undefined)}
				/>
				<View style={styles.body}>
					<View style={styles.header}>
						<View style={styles.userData}>
							<Typography.Headline>{name}</Typography.Headline>
							{question.from && <Typography.Subtitle>@{question.from.tag}</Typography.Subtitle>}
						</View>
						<IconButton icon="dots-vertical" size={24} onPress={() => {}} style={styles.menuButton} />
					</View>
					<View>
						<Typography.Body style={styles.content}>{question.content}</Typography.Body>
						<Typography.Caption>{dateFormatter(question.date)}</Typography.Caption>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};
