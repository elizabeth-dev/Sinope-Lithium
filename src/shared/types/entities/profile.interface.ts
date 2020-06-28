export interface IProfile {
	id: string;
	tag: string;
	name: string;
	created: Date;
	description: string;
}

export interface CreateProfileDto {
	tag: string;
	name: string;
	description: string;
}

export interface UpdateProfileDto {
	tag: string;
	name: string;
	description: string;
}
