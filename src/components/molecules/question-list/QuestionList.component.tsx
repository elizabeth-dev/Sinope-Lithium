import { Divider } from '@atoms/divider/Divider.component';
import { SlimQuestion } from '@molecules/slim-question/SlimQuestion.component';
import { FullQuestion } from '@shared/types/entities/question.interface';
import React from 'react';
import { FlatList } from 'react-native';

export interface QuestionListProps {
	questions: FullQuestion[];
	onRefresh?: () => void;
	refreshing?: boolean;
	stackId: string;
}

export const QuestionList: React.FC<QuestionListProps> = React.memo((props) => (
	<FlatList
		data={props.questions}
		extraData={props.stackId}
		renderItem={(el) => <SlimQuestion stackId={props.stackId} question={el.item} />}
		keyExtractor={(item) => item.id}
		showsVerticalScrollIndicator={false}
		ItemSeparatorComponent={Divider}
		onRefresh={props.onRefresh}
		refreshing={props.refreshing}
	/>
));
