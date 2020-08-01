export interface FetchFields {
	isFetching: boolean;
	receivedAt: number;
}

export type FetchEntity<K extends string, T> = { [P in K]: T } & FetchFields;
