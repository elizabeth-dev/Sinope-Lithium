import { AuthActionsDto } from './auth.actions';
import { PostActionsDto } from './post.actions';
import { ProfileActionsDto } from './profile.actions';

export type AppActionsDto = AuthActionsDto | PostActionsDto | ProfileActionsDto;
