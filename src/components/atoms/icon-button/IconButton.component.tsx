import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Icon, IconNamespaces } from '../icon/Icon.component';
import { IconButtonStyles as styles } from './IconButton.styles';

export interface IconButtonProps {
	icon: string;
	iconNamespace?: IconNamespaces;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	size?: number;
	ripple?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
	icon,
	iconNamespace,
	onPress,
	onLongPress,
	style,
	size,
	ripple = true,
}) => {
	return (
		<View style={[style, styles.root]}>
			<Pressable
				onPress={onPress}
				onLongPress={onLongPress}
				style={[{ borderRadius: size ?? undefined }, styles.pressable]}
				android_ripple={
					ripple
						? {
								color: 'darkgrey',
								borderless: true,
						  }
						: null
				}>
				<Icon icon={icon} namespace={iconNamespace} style={styles.icon} size={size} />
			</Pressable>
		</View>
	);
};
