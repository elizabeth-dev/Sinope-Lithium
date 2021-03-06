import { Disclaimer } from '@atoms/disclaimer/Disclaimer.component';
import React from 'react';
import { Action, AnyAction, Store } from 'redux';
import { reduxProviderHOC } from '../redux-provider/reduxProviderHOC';
import { screenHOCStyles as styles } from './screenHOC.styles';

const _screenHOC =
	<P extends {}>(WrappedComponent: React.FC<P>, disclaimer: boolean): React.FC<P> =>
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
	component: React.FC<P>,
	store: Store<any, A>,
	disclaimer = true,
	persistGate = false,
): React.ComponentType<P> => reduxProviderHOC(_screenHOC(component, disclaimer), store, persistGate);
