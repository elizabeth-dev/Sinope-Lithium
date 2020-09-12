import React from 'react';
import { DisclaimerStyles as styles } from './Disclaimer.styles';
import { StyleProp, Text, TextStyle } from 'react-native';

export interface DisclaimerProps {
	children: string;
	style: StyleProp<TextStyle>;
}

export const Disclaimer: React.FC<DisclaimerProps> = (props) => (
	<Text style={[styles.text, props.style]}>{props.children}</Text>
);
