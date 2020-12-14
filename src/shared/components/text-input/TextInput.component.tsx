import React from 'react';
import { TextInputStyles as styles } from './TextInput.styles';
import { StyleProp, TextInput as _TextInput, TextInputProps as _TextInputProps, View } from 'react-native';

export interface TextInputProps extends Omit<_TextInputProps, 'style'> {
	color?: string;
	style?: StyleProp<View>;
	error?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
	color = 'purple',
	style,
	error = false,
	...textInputProps
}) => {
	return (<View style={[style, styles.root]}>
		<_TextInput
			{...textInputProps}
			underlineColorAndroid={error ? 'red' : color}
			style={styles.textInput}
		/>
	</View>);
};
