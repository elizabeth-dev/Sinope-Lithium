import { useDispatch } from 'react-redux';
import { appStore } from '@core/app.store';

export const useAppDispatch = () => useDispatch<typeof appStore.dispatch>();
