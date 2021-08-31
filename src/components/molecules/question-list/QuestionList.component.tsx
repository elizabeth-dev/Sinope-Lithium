import { Divider } from '@atoms/divider/Divider.component';
import { SlimQuestion } from '@molecules/slim-question/SlimQuestion.component';
import { FullQuestion } from '@shared/types/entities/question.interface';
import React from 'react';
import { FlatList } from 'react-native';

export interface QuestionListProps {
	questions: FullQuestion[];
	onRefresh?: () => void;
	refreshing?: boolean;
	onQuestionAnswer: (questionId: string) => void;
	onProfileNav: (profileId: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = React.memo((props) => (
	<FlatList
		data={props.questions}
		renderItem={(el) => (
			<SlimQuestion
				question={el.item}
				onQuestionAnswer={props.onQuestionAnswer}
				onProfileNav={props.onProfileNav}
			/>
		)}
		keyExtractor={(item) => item.id}
		showsVerticalScrollIndicator={false}
		ItemSeparatorComponent={Divider}
		onRefresh={props.onRefresh}
		refreshing={props.refreshing}
	/>
));
