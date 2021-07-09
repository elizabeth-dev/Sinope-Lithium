import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialVanillaIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleProp, TextStyle } from 'react-native';

export type IconNamespaces = 'vanilla' | 'materialCommunity';

export interface IconProps {
	namespace?: IconNamespaces;
	size?: number;
	icon: string;
	color?: string;
	style?: StyleProp<TextStyle>
}

export const Icon: React.FC<IconProps> = React.memo(({
	icon,
	color,
	style,
	namespace = 'materialCommunity',
	size = 24,
}) => {
	const IconComp = namespace === 'vanilla' ? MaterialVanillaIcon : MaterialCommunityIcon;

	return <IconComp name={icon} size={size} color={color} style={style} />;
});

