import { FullPost } from '@shared/types/entities/post.interface';

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
		posts: FullPost[]; profile: string; receivedAt: number;
	};
}

const receiveTimelineFn = (posts: FullPost[], profile: string, receivedAt: number): IReceiveTimelineAction => ({
	type: ReceiveTimelineAction,
	payload: { posts, profile, receivedAt },
});

export type TimelineActionsDto =
	| IReceiveTimelineAction
	| IRequestTimelineAction;

export const TimelineActions = {
	request: requestTimelineFn,
	receive: receiveTimelineFn,
};
