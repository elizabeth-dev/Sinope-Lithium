import { IPost } from '@shared/types/entities/post.interface';
import { IProfile } from '@shared/types/entities/profile.interface';
import { IQuestion } from '@shared/types/entities/question.interface';

export const SearchAction = 'search/SearchAction';

export interface ISearchAction {
	type: typeof SearchAction;
	payload: {
		searchTerm: string;
	};
}

const searchFn = (searchTerm: string): ISearchAction => ({
	type: SearchAction,
	payload: { searchTerm },
});

export const RemoveSearchAction = 'search/RemoveSearchAction';

export interface IRemoveSearchAction {
	type: typeof RemoveSearchAction;
	payload: {
		searchTerm: string;
	};
}

const removeSearchFn = (searchTerm: string): IRemoveSearchAction => ({
	type: RemoveSearchAction,
	payload: { searchTerm },
});

export const ReceiveSearchAction = 'search/ReceiveSearchAction';

export interface IReceiveSearchAction {
	type: typeof ReceiveSearchAction;
	payload: {
		searchTerm: string;
		receivedAt: number;
		profiles: IProfile[];
		posts: IPost[];
		questions: IQuestion[];
	};
}

const receiveSearchFn = (
	profiles: IProfile[],
	posts: IPost[],
	questions: IQuestion[],
	searchTerm: string,
	receivedAt: number,
): IReceiveSearchAction => ({
	type: ReceiveSearchAction,
	payload: {
		profiles,
		posts,
		questions,
		searchTerm,
		receivedAt,
	},
});

export type SearchActionsDto = ISearchAction | IReceiveSearchAction | IRemoveSearchAction;

export const SearchActions = {
	search: searchFn,
	receiveSearch: receiveSearchFn,
	remove: removeSearchFn,
};
