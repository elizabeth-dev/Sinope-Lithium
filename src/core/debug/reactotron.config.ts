import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
	.configure({ host: '192.168.1.131' })
	.use(reactotronRedux())
	.useReactNative()
	.connect();

export { reactotron };
