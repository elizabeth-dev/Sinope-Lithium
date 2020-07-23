export interface IPost {
	id: string;
	content: string;
	date: Date;
	profile: string;
	likes: string[];
	question?: string;
}

export interface INewPost {
	content: string;
	question?: string;
	profile: string;
	tmpId: string;
}

export interface CreatePostDto {
	profile: string;
	content: string;
	question?: string;
}
