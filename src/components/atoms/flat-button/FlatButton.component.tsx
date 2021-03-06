import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Icon, IconNamespaces } from '../icon/Icon.component';
import { FlatButtonStyles as styles } from './FlatButton.styles';

export interface FlatButtonProps {
	icon?: string;
	iconNamespace?: IconNamespaces;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	ripple?: boolean;
	children: string;
}

export const FlatButton: React.FC<FlatButtonProps> = ({
	icon,
	iconNamespace,
	onPress,
	onLongPress,
	style,
	textStyle,
	ripple = true,
	children,
}) => {
	return (
		<View style={[styles.root, style]}>
			<Pressable
				onPress={onPress}
				onLongPress={onLongPress}
				style={styles.pressable}
				android_ripple={
					ripple
						? {
								color: 'grey',
								borderless: true,
						  }
						: null
				}>
				{icon && <Icon icon={icon} namespace={iconNamespace} style={styles.icon} />}
				<Text style={[styles.text, textStyle]}>{children.toUpperCase()}</Text>
			</Pressable>
		</View>
	);
};
