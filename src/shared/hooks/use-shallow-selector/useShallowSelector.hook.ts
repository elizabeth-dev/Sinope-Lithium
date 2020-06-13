import { DefaultRootState, shallowEqual, useSelector } from 'react-redux';

export function useShallowSelector<TState = DefaultRootState, TSelected = unknown>(
	selector: (state: TState) => TSelected,
): TSelected {
	return useSelector(selector, shallowEqual);
}
