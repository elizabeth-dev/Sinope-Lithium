import { Disclaimer } from '@atoms/disclaimer/Disclaimer.component';
import { ComponentType, FC } from 'react';
import { Action, AnyAction, Store } from 'redux';
import { reduxProviderHOC } from '../redux-provider/reduxProviderHOC';
import { screenHOCStyles as styles } from './screenHOC.styles';

const _screenHOC =
	<P extends {}>(WrappedComponent: FC<P>, disclaimer: boolean): FC<P> =>
	(props) =>
		(
			<>
				<WrappedComponent {...props} />
				{__DEV__ && disclaimer && (
					<Disclaimer style={[styles.disclaimer, styles.disclaimerBottom]}>UNSTABLE - INSECURE</Disclaimer>
				)}
			</>
		);

export const screenHOC = <P extends {}, A extends Action = AnyAction>(
	component: FC<P>,
	store: Store<any, A>,
	disclaimer = true,
	persistGate = false,
): ComponentType<P> => reduxProviderHOC(_screenHOC(component, disclaimer), store, persistGate);
