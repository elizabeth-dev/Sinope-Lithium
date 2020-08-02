import React from 'react';
import { Animated, ViewStyle, Dimensions } from 'react-native';
import { ProgressBarStyles as styles } from './ProgressBar.styles';

export interface ProgressBarProps {
	style?: Animated.WithAnimatedObject<ViewStyle>;
	height?: number;
	indeterminateDuration?: number;
	backgroundColor: string;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({
	height = 4,
	indeterminateDuration = 1000,
	backgroundColor,
	style,
}) => {
	const [timer] = React.useState(new Animated.Value(0));

	const indeterminateAnimation = Animated.timing(timer, {
		duration: indeterminateDuration,
		toValue: 1,
		useNativeDriver: true,
		isInteraction: false,
	});

	const startAnimation = React.useCallback(() => {
		timer.setValue(0);
		Animated.loop(indeterminateAnimation).start();
	}, [indeterminateAnimation, timer]);

	const viewWidth = Dimensions.get('screen').width;
	const styleAnimation = () => ({
		transform: [
			{
				translateX: timer.interpolate({
					inputRange: [0, 0.5, 1],
					outputRange: [
						-0.6 * viewWidth,
						-0.5 * 0.8 * viewWidth,
						0.7 * viewWidth,
					],
				}),
			},
			{
				scaleX: timer.interpolate({
					inputRange: [0, 0.5, 1],
					outputRange: [0.0001, 0.8, 0.0001],
				}),
			},
		],
	});

	React.useEffect(() => {
		startAnimation();
	}, [startAnimation]);

	return (
		<Animated.View style={[styles.container, { height }, style]}>
			<Animated.View
				style={[
					styles.progressBar,
					{
						backgroundColor,
						...styleAnimation(),
					},
				]}
			/>
		</Animated.View>
	);
};
