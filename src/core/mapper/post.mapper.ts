import { PostRes } from '@core/api/model/api';
import { IPost } from '@shared/types/entities/post.interface';

export const postResToIPost = (postRes: PostRes): IPost => ({
	id: postRes.id,
	content: postRes.content,
	date: postRes.date,
	likes: postRes.likeIds,
	profile: postRes.profileId,
	question: postRes.questionId,
});

export const iPostToId = (post: IPost): string => post.id;
