import { AuthActionsDto } from '@actions/auth.actions';
import { PostActionsDto } from '@actions/post.actions';
import { ProfileActionsDto } from '@actions/profile.actions';
import { QuestionActionsDto } from '@actions/question.actions';
import { SearchActionsDto } from '@actions/search.actions';
import { SelfActionsDto } from '@actions/self.actions';
import { TimelineActionsDto } from '@actions/timeline.actions';
import { UserActionsDto } from '@actions/user.actions';

export type AppActionsDto =
	| AuthActionsDto
	| PostActionsDto
	| ProfileActionsDto
	| UserActionsDto
	| TimelineActionsDto
	| SelfActionsDto
	| SearchActionsDto
	| QuestionActionsDto;
