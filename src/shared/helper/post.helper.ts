import { ProfilesByIdState } from '@core/state/reducers/currentData/profile/profilesById.reducer';
import { FullPost, FullPostEntity, IPost, PostEntity } from '@shared/types/entities/post.interface';
import { QuestionsByIdState } from '@core/state/reducers/currentData/question/questionsById.reducer';
import { populateQuestion } from './question.helper';

export const populatePostEntity = (
	post: PostEntity,
	profilesById: ProfilesByIdState,
	questionsById: QuestionsByIdState,
): FullPostEntity =>
	post && {
		...post,
		post: populatePost(post.post, profilesById, questionsById),
	};

export const populatePost = (
	post: IPost,
	profilesById: ProfilesByIdState,
	questionsById: QuestionsByIdState,
): FullPost =>
	post && {
		...post,
		profile: profilesById[post.profile]?.profile,
		question: post.question ? populateQuestion(questionsById[post.question].question, profilesById) : undefined,
	};
