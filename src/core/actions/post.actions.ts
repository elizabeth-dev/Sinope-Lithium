import { INewPost, IPost } from '@shared/types/entities/post.interface';

export const RequestPostAction = 'post/RequestPostAction';

export interface IRequestPostAction {
	type: typeof RequestPostAction;
	payload: {
		post: string;
	};
}

export const ReceivePostsAction = 'post/ReceivePostsAction';

export interface IReceivePostsAction {
	type: typeof ReceivePostsAction;
	payload: {
		posts: IPost[];
		receivedAt: number;
	};
}

export const RequestProfilePostsAction = 'post/RequestProfilePostsAction';

export interface IRequestProfilePostsAction {
	type: typeof RequestProfilePostsAction;
	payload: {
		profile: string;
	};
}

export const ReceiveProfilePostsAction = 'post/ReceiveProfilePostsAction';

export interface IReceiveProfilePostsAction {
	type: typeof ReceiveProfilePostsAction;
	payload: {
		profile: string;
		posts: IPost[];
		receivedAt: number;
	};
}

export const SendPostAction = 'post/SendPostAction';

export interface ISendPostAction {
	type: typeof SendPostAction;
	payload: {
		newPost: INewPost;
	};
}

const sendPostFn = (newPost: INewPost): ISendPostAction => ({ type: SendPostAction, payload: { newPost } });

export const SentPostAction = 'post/SentPostAction';

export interface ISentPostAction {
	type: typeof SentPostAction;
	payload: {
		post: IPost;
		receivedAt: number;
		tmpId: string;
	};
}

const sentPostFn = (post: IPost, receivedAt: number, tmpId: string): ISentPostAction => ({
	type: SentPostAction,
	payload: { post, receivedAt, tmpId },
});

export const FailedSentPostAction = 'post/FailedSentPostAction';

export interface IFailedSentPostAction {
	type: typeof FailedSentPostAction;
	payload: {
		tmpId: string;
	};
}

export const DeletePostAction = 'post/DeletePostAction';

export interface IDeletePostAction {
	type: typeof DeletePostAction;
	payload: {
		post: string;
	};
}

export const LikePostAction = 'post/LikePostAction';

export interface ILikePostAction {
	type: typeof LikePostAction;
	payload: {
		post: string;
	};
}

const likePostFn = (post: string): ILikePostAction => ({ type: LikePostAction, payload: { post } });

export const UnlikePostAction = 'post/UnlikePostAction';

export interface IUnlikePostAction {
	type: typeof UnlikePostAction;
	payload: {
		post: string;
	};
}

export type PostActionsDto =
	| ISendPostAction
	| IRequestPostAction
	| IDeletePostAction
	| ILikePostAction
	| IUnlikePostAction
	| IRequestProfilePostsAction
	| IReceivePostsAction
	| IReceiveProfilePostsAction
	| ISentPostAction
	| IFailedSentPostAction;

export const PostActions = { send: sendPostFn, sent: sentPostFn, like: likePostFn };
