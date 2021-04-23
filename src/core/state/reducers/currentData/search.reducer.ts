import { ReceiveSearchAction, RemoveSearchAction, SearchAction, SearchActionsDto } from '../../actions/search.actions';
import { SearchEntity } from '@shared/types/entities/search.interface';

export interface SearchState {
	history: string[];
	cache: {
		[term: string]: SearchEntity;
	};
}

const initialState: SearchState = {
	history: [],
	cache: {},
};

export function searchReducer(state = initialState, action: SearchActionsDto): SearchState {
	switch (action.type) {
		case SearchAction:
			return {
				...state,
				history:
					state.history.indexOf(action.payload.searchTerm) === -1
						? [action.payload.searchTerm, ...state.history.slice(0, 4)]
						: state.history,
				cache: {
					...state.cache,
					[action.payload.searchTerm]: {
						...(state.cache[action.payload.searchTerm] ?? {
							search: {
								posts: [],
								profiles: [],
							},
						}),
						isFetching: true,
					},
				},
			};
		case RemoveSearchAction:
			return {
				...state,
				history: state.history.filter((el) => el !== action.payload.searchTerm),
				cache: {
					...state.cache,
					[action.payload.searchTerm]: undefined!, // FIXME: ...
				},
			};
		case ReceiveSearchAction:
			return {
				...state,
				cache: {
					...state.cache,
					[action.payload.searchTerm]: {
						...state.cache[action.payload.searchTerm],
						search: {
							profiles: action.payload.profiles.map((el) => el.id),
							posts: action.payload.posts.map((el) => el.id),
						},
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				},
			};
		default:
			return state;
	}
}
