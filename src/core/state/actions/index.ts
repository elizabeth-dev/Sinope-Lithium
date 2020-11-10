import { AuthActionsDto } from './auth.actions';
import { PostActionsDto } from './post.actions';
import { ProfileActionsDto } from './profile.actions';
import { UserActionsDto } from './user.actions';
import { TimelineActionsDto } from './timeline.actions';
import { SelfActionsDto } from '@core/state/actions/self.actions';
import { SearchActionsDto } from './search.actions';

export type AppActionsDto =
	| AuthActionsDto
	| PostActionsDto
	| ProfileActionsDto
	| UserActionsDto
	| TimelineActionsDto
	| SelfActionsDto
	| SearchActionsDto;
