import React from 'react';
import { ButtonStyles as styles } from './Button.styles';
import { ColorValue, GestureResponderEvent, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Icon, IconNamespaces } from '../icon/Icon.component';
import { Colors } from 'react-native-paper';
import { Typography } from '../typography/Typography.component';

export interface ButtonProps {
	icon?: string;
	iconNamespace?: IconNamespaces;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	ripple?: boolean;
	children: string;
	backgroundColor?: ColorValue;
	color?: ColorValue;
}

export const Button: React.FC<ButtonProps> = ({
	icon,
	iconNamespace,
	onPress,
	onLongPress,
	style,
	ripple = true,
	children,
	backgroundColor = Colors.purple600,
	color = '#ffffff',
}) => {
	return (<View style={[styles.root, { backgroundColor }, style]}>
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			style={styles.pressable}
			android_ripple={ripple ? {
				color: 'grey',
				borderless: true,
			} : null}
		>
			{icon && <Icon icon={icon} namespace={iconNamespace} style={styles.icon} />}
			<Typography.Button color={color}>{children}</Typography.Button>
		</Pressable>
	</View>);
};
