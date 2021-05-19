/**
 *
 * @export
 * @interface CreatePostReq
 */
export interface CreatePostReq {
	/**
	 *
	 * @type {string}
	 * @memberof CreatePostReq
	 */
	content: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreatePostReq
	 */
	profile: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreatePostReq
	 */
	question?: string;
}

/**
 *
 * @export
 * @interface CreateProfileReq
 */
export interface CreateProfileReq {
	/**
	 *
	 * @type {string}
	 * @memberof CreateProfileReq
	 */
	tag: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreateProfileReq
	 */
	name: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreateProfileReq
	 */
	description?: string;
}

/**
 *
 * @export
 * @interface CreateQuestionReq
 */
export interface CreateQuestionReq {
	/**
	 *
	 * @type {string}
	 * @memberof CreateQuestionReq
	 */
	content: string;

	/**
	 *
	 * @type {boolean}
	 * @memberof CreateQuestionReq
	 */
	anonymous: boolean;

	/**
	 *
	 * @type {string}
	 * @memberof CreateQuestionReq
	 */
	from: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreateQuestionReq
	 */
	recipient: string;
}

/**
 *
 * @export
 * @interface CreateUserReq
 */
export interface CreateUserReq {
	/**
	 *
	 * @type {string}
	 * @memberof CreateUserReq
	 */
	email: string;

	/**
	 *
	 * @type {string}
	 * @memberof CreateUserReq
	 */
	password: string;
}

/**
 *
 * @export
 * @interface PostRes
 */
export interface PostRes {
	/**
	 *
	 * @type {string}
	 * @memberof PostRes
	 */
	id: string;

	/**
	 *
	 * @type {string}
	 * @memberof PostRes
	 */
	content: string;

	/**
	 *
	 * @type {Date}
	 * @memberof PostRes
	 */
	date: Date;

	/**
	 *
	 * @type {string}
	 * @memberof PostRes
	 */
	profileId: string;

	/**
	 *
	 * @type {ProfileRes}
	 * @memberof PostRes
	 */
	profile?: ProfileRes;

	/**
	 *
	 * @type {Array<string>}
	 * @memberof PostRes
	 */
	likeIds: Array<string>;

	/**
	 *
	 * @type {Array<ProfileRes>}
	 * @memberof PostRes
	 */
	likes?: Array<ProfileRes>;

	/**
	 *
	 * @type {string}
	 * @memberof PostRes
	 */
	questionId?: string;

	/**
	 *
	 * @type {QuestionRes}
	 * @memberof PostRes
	 */
	question?: QuestionRes;
}

/**
 *
 * @export
 * @interface ProfileRes
 */
export interface ProfileRes {
	/**
	 *
	 * @type {string}
	 * @memberof ProfileRes
	 */
	id: string;

	/**
	 *
	 * @type {string}
	 * @memberof ProfileRes
	 */
	tag: string;

	/**
	 *
	 * @type {string}
	 * @memberof ProfileRes
	 */
	name: string;

	/**
	 *
	 * @type {string}
	 * @memberof ProfileRes
	 */
	description: string;

	/**
	 *
	 * @type {Date}
	 * @memberof ProfileRes
	 */
	created: Date;

	/**
	 *
	 * @type {Array<string>}
	 * @memberof ProfileRes
	 */
	followingIds: Array<string>;

	/**
	 *
	 * @type {Array<ProfileRes>}
	 * @memberof ProfileRes
	 */
	following: Array<ProfileRes>;

	/**
	 *
	 * @type {Array<string>}
	 * @memberof ProfileRes
	 */
	followerIds: Array<string>;

	/**
	 *
	 * @type {Array<ProfileRes>}
	 * @memberof ProfileRes
	 */
	followers: Array<ProfileRes>;

	/**
	 *
	 * @type {boolean}
	 * @memberof ProfileRes
	 */
	followingThem?: boolean;

	/**
	 *
	 * @type {boolean}
	 * @memberof ProfileRes
	 */
	followingMe?: boolean;
}

/**
 *
 * @export
 * @interface QuestionRes
 */
export interface QuestionRes {
	/**
	 *
	 * @type {string}
	 * @memberof QuestionRes
	 */
	id: string;

	/**
	 *
	 * @type {string}
	 * @memberof QuestionRes
	 */
	content: string;

	/**
	 *
	 * @type {boolean}
	 * @memberof QuestionRes
	 */
	anonymous: boolean;

	/**
	 *
	 * @type {Date}
	 * @memberof QuestionRes
	 */
	date: Date;

	/**
	 *
	 * @type {string}
	 * @memberof QuestionRes
	 */
	fromId?: string;

	/**
	 *
	 * @type {ProfileRes}
	 * @memberof QuestionRes
	 */
	from?: ProfileRes;

	/**
	 *
	 * @type {string}
	 * @memberof QuestionRes
	 */
	recipientId: string;

	/**
	 *
	 * @type {ProfileRes}
	 * @memberof QuestionRes
	 */
	recipient?: ProfileRes;

	/**
	 *
	 * @type {string}
	 * @memberof QuestionRes
	 */
	answerId?: string;

	/**
	 *
	 * @type {PostRes}
	 * @memberof QuestionRes
	 */
	answer?: PostRes;
}

/**
 *
 * @export
 * @interface SearchRes
 */
export interface SearchRes {
	/**
	 *
	 * @type {Array<ProfileRes>}
	 * @memberof SearchRes
	 */
	profiles: Array<ProfileRes>;

	/**
	 *
	 * @type {Array<PostRes>}
	 * @memberof SearchRes
	 */
	posts: Array<PostRes>;
}

/**
 *
 * @export
 * @interface TokenPairRes
 */
export interface TokenPairRes {
	/**
	 *
	 * @type {string}
	 * @memberof TokenPairRes
	 */
	accessToken: string;

	/**
	 *
	 * @type {string}
	 * @memberof TokenPairRes
	 */
	refreshToken: string;

	/**
	 *
	 * @type {number}
	 * @memberof TokenPairRes
	 */
	expiresAt: number;
}

/**
 *
 * @export
 * @interface UpdateProfileReq
 */
export interface UpdateProfileReq {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateProfileReq
	 */
	tag?: string;

	/**
	 *
	 * @type {string}
	 * @memberof UpdateProfileReq
	 */
	name?: string;

	/**
	 *
	 * @type {string}
	 * @memberof UpdateProfileReq
	 */
	description?: string;
}

/**
 *
 * @export
 * @interface UserRes
 */
export interface UserRes {
	/**
	 *
	 * @type {string}
	 * @memberof UserRes
	 */
	id: string;

	/**
	 *
	 * @type {string}
	 * @memberof UserRes
	 */
	email: string;

	/**
	 *
	 * @type {Date}
	 * @memberof UserRes
	 */
	created: Date;

	/**
	 *
	 * @type {Array<string>}
	 * @memberof UserRes
	 */
	profileIds: Array<string>;

	/**
	 *
	 * @type {Array<ProfileRes>}
	 * @memberof UserRes
	 */
	profiles: Array<ProfileRes>;
}
