import { useDispatch } from 'react-redux';
import { appStore } from '@core/state/app.store';

export const useAppDispatch = () => useDispatch<typeof appStore.dispatch>();
