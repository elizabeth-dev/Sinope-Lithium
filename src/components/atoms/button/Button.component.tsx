import { colors } from '@theme/colors';
import React from 'react';
import { ColorValue, GestureResponderEvent, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Icon, IconNamespaces } from '../icon/Icon.component';
import { Typography } from '../typography/Typography.component';
import { ButtonStyles as styles } from './Button.styles';

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
	backgroundColor = colors.purple600,
}) => (
	<View style={[styles.root, { backgroundColor }, style]}>
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
			<Typography.Button>{children}</Typography.Button>
		</Pressable>
	</View>
);
