import { ProfilesByIdState } from '@core/reducers/profile/profilesById.reducer';
import { FullPost, FullPostEntity, IPost, PostEntity } from '@shared/types/entities/post.interface';

export const populatePostEntity = (
	post: PostEntity,
	profilesById: ProfilesByIdState,
): FullPostEntity =>
	post && {
		...post,
		post: {
			...post.post,
			profile: profilesById[post?.post?.profile]?.profile,
		},
	};

export const populatePost = (
	post: IPost,
	profilesById: ProfilesByIdState,
): FullPost => ({
	...post,
	profile: profilesById[post?.profile]?.profile,
});
