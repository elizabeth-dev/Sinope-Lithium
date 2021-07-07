import React from 'react';
import { GestureResponderEvent, Pressable, View, ViewStyle } from 'react-native';
import { Icon, IconNamespaces } from '../icon/Icon.component';
import { FabStyles as styles } from './Fab.styles';

export interface FabProps {
	icon: string;
	iconNamespace?: IconNamespaces;
	onPress?: (ev: GestureResponderEvent) => void;
	style?: ViewStyle;
}

export const Fab: React.FC<FabProps> = ({ icon, iconNamespace, onPress, style }) => {
	return (
		<View style={[style, styles.root]}>
			<Pressable
				style={styles.wrapper}
				onPress={onPress}
				android_ripple={{
					color: 'grey',
					borderless: true,
				}}>
				<Icon icon={icon} namespace={iconNamespace} size={24} style={styles.icon} />
			</Pressable>
		</View>
	);
};
