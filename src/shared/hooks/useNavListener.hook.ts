import { useEffect } from 'react';
import { Navigation, NavigationComponentListener } from 'react-native-navigation';

export const useNavListener = (componentId: string, listener: NavigationComponentListener) => {
	useEffect(() => {
		const subscription = Navigation.events().registerComponentListener(listener, componentId);

		return () => subscription.remove();
	}, [componentId, listener]);
};
