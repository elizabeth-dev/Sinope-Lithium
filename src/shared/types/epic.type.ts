import { ITokenExpiredAction } from '@actions/auth.actions';
import { AppActionsDto } from '@core/state/actions/app.actions';

export type Expirable<T extends AppActionsDto> = T | ITokenExpiredAction;
