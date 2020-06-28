export interface IQuestion {
	content: string;
	anonymous: boolean;
	profile?: string;
	recipient: string;
	answer?: string;
}

export interface CreateQuestionDto {
	content: string;
	anonymous: boolean;
	profile: string;
	recipient: string;
}
