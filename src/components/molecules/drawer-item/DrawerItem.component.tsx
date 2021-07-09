import { Icon, IconNamespaces } from '@atoms/icon/Icon.component';
import { Typography } from '@atoms/typography/Typography.component';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { DrawerItemStyles as styles } from './DrawerItem.styles';

export interface DrawerItemProps {
	label: string;
	icon?: string;
	iconNamespace?: IconNamespaces;
	onPress?: (ev: GestureResponderEvent) => void;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({ icon, iconNamespace, label, onPress }) => {
	return (
		<View style={styles.root}>
			<Pressable
				style={styles.wrapper}
				onPress={onPress}
				android_ripple={{
					color: 'grey',
					borderless: true,
				}}>
				{icon && <Icon icon={icon} namespace={iconNamespace} size={24} style={styles.icon} />}
				<Typography.Body lines={1}>{label}</Typography.Body>
			</Pressable>
		</View>
	);
};
