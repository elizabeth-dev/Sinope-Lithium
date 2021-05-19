import { IPost } from '@shared/types/entities/post.interface';
import { IProfile } from '@shared/types/entities/profile.interface';
import { IQuestion } from '@shared/types/entities/question.interface';

export const RequestTimelineAction = 'timeline/RequestTimelineAction';

export interface IRequestTimelineAction {
	type: typeof RequestTimelineAction;
	payload: {
		profile: string;
	};
}

const requestTimelineFn = (profile: string): IRequestTimelineAction => ({
	type: RequestTimelineAction,
	payload: { profile },
});

export const ReceiveTimelineAction = 'timeline/ReceiveTimelineAction';

export interface IReceiveTimelineAction {
	type: typeof ReceiveTimelineAction;
	payload: {
		posts: IPost[];
		profiles: IProfile[];
		questions: IQuestion[];
		fromProfile: string;
		receivedAt: number;
	};
}

const receiveTimelineFn = (
	posts: IPost[],
	profiles: IProfile[],
	questions: IQuestion[],
	fromProfile: string,
	receivedAt: number,
): IReceiveTimelineAction => ({
	type: ReceiveTimelineAction,
	payload: { posts, profiles, questions, fromProfile, receivedAt },
});

export type TimelineActionsDto = IReceiveTimelineAction | IRequestTimelineAction;

export const TimelineActions = {
	request: requestTimelineFn,
	receive: receiveTimelineFn,
};
