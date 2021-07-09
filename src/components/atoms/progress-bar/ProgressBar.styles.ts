import { StyleSheet } from 'react-native';

export const ProgressBarStyles = StyleSheet.create({
	container: {
		width: '100%',
		overflow: 'hidden',
		backgroundColor: '#A6A6A6', // FIXME: Calc backgroundColor
	},
	progressBar: {
		flex: 1,
	},
});
