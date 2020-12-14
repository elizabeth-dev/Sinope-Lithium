import React, { ReactNode } from 'react';
import { ColorValue, StyleProp, Text, TextStyle } from 'react-native';
import { TypographyStyles as styles } from './Typography.styles';

export interface TypographyProps {
	children?: ReactNode;
	color?: ColorValue;
	style?: StyleProp<TextStyle>;
}

const _Typography: React.FC<TypographyProps & { _style: StyleProp<TextStyle> }> = ({
	children,
	_style,
	style,
	color = '#000000',
}) => {
	return (<Text style={[_style, { color }, style]}>{children}</Text>);
};

export const Typography: { [type: string]: React.FC<TypographyProps> } = {
	Headline: props => <_Typography _style={styles.headline} {...props} />,
	Body: props => <_Typography _style={styles.body} {...props} />,
	Subtitle: props => <_Typography _style={styles.subtitle} {...props} />,
	Caption: props => <_Typography _style={styles.caption} {...props} />,
	Button: props => <_Typography _style={styles.button} {...props} />,
};
