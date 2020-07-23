import { AuthActionsDto } from './auth.actions';
import { PostActionsDto } from './post.actions';
import { ProfileActionsDto } from './profile.actions';
import { UserActionsDto } from './user.actions';
import { TimelineActionsDto } from './timeline.actions';

export type AppActionsDto =
	| AuthActionsDto
	| PostActionsDto
	| ProfileActionsDto
	| UserActionsDto
	| TimelineActionsDto;
