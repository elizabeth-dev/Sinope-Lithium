import { INewPost } from '@shared/types/post.interface';

export const CreatePostAction = 'post/AddPost';

export interface ICreatePostAction {
	type: typeof CreatePostAction;
	payload: {
		newPost: INewPost;
	}
}

export const DeletePostAction = 'post/DeletePost';

export interface IDeletePostAction {
	type: typeof DeletePostAction;
	payload: {
		post: string;
	};
}

export const GetPostAction = 'post/GetPostAction';

export interface IGetPostAction {
	type: typeof GetPostAction;
	payload: {
		post: string;
	};
}

export const LikePostAction = 'post/LikePost';

export interface ILikePostAction {
	type: typeof LikePostAction;
	payload: {
		post: string;
	};
}

export const UnlikePostAction = 'post/UnlikePost';

export interface IUnlikePostAction {
	type: typeof UnlikePostAction;
	payload: {
		post: string;
	};
}

export type PostActions = ICreatePostAction | IGetPostAction | IDeletePostAction | ILikePostAction | IUnlikePostAction;
