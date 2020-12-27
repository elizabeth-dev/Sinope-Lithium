import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { FullQuestion } from '../../types/entities/question.interface';
import { SlimQuestion } from '../slim-question/SlimQuestion.component';

export interface QuestionListProps {
	questions: FullQuestion[];
	onRefresh?: () => void;
	refreshing?: boolean;
	stackId: string;
}

export const QuestionList: React.FC<QuestionListProps> = React.memo((props) => (<FlatList
	data={props.questions}
	extraData={props.stackId}
	renderItem={(el) => (<SlimQuestion
		stackId={props.stackId}
		question={el.item}
	/>)}
	keyExtractor={(item) => item.id}
	showsVerticalScrollIndicator={false}
	ItemSeparatorComponent={Divider}
	onRefresh={props.onRefresh}
	refreshing={props.refreshing}
/>));
