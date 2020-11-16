import { IProfile } from '@shared/types/entities/profile.interface';
import { FullPost } from '@shared/types/entities/post.interface';

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
		searchTerm: string; receivedAt: number; profiles: IProfile[]; posts: FullPost[];
	};
}

const receiveSearchFn = (profiles: IProfile[],
	posts: FullPost[],
	searchTerm: string,
	receivedAt: number): IReceiveSearchAction => ({
	type: ReceiveSearchAction,
	payload: {
		profiles,
		posts,
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
