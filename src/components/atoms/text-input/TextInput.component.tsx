import { theme } from '@theme/main.theme';
import React from 'react';
import { StyleProp, TextInput as _TextInput, TextInputProps as _TextInputProps, View } from 'react-native';
import { TextInputStyles as styles } from './TextInput.styles';

export interface TextInputProps extends Omit<_TextInputProps, 'style'> {
	color?: string;
	style?: StyleProp<View>;
	error?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
	color = theme.colors.secondary,
	style,
	error = false,
	...textInputProps
}) => (
	<View style={[style, styles.root]}>
		<_TextInput
			{...textInputProps}
			underlineColorAndroid={error ? theme.colors.warn : color}
			style={styles.textInput}
		/>
	</View>
);
