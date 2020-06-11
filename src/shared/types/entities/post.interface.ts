export interface IPost {
	id: string;
	content: string;
	date: Date;
	author: string;
	likes: string[];
	question?: string;
}

export interface INewPost {
	content: string;
	question?: string;
	profile: string;
	tmpId: string;
}
