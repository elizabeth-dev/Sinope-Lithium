export const RequestPostAction = 'post/RequestPostAction';

export interface IRequestSelfUserAction {
	type: typeof RequestPostAction;
	payload: {
		post: string;
	};
}

export type PostActionsDto = ISendPostAction;

export const PostActions = {
	send: sendPostFn,
	sent: sentPostFn,
	like: likePostFn,
};
