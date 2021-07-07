import { createTransform } from 'redux-persist';

const arrayKeyReplacer = <T>(input: T[], key: string, value: unknown): T[] =>
	input.map((itemEl) => {
		if (Array.isArray(itemEl)) return arrayKeyReplacer(itemEl, key, value) as unknown as T;
		if (typeof itemEl === 'object') return keyReplacer(itemEl, key, value);
		return itemEl;
	});

const keyReplacer = <T extends { [key: string]: any }>(input: T, key: string, value: unknown): T =>
	Object.keys(input).reduce((acc, el) => {
		const item = input[el];

		if (el === key) return { ...acc, [el]: value };
		if (Array.isArray(item)) return { ...acc, [el]: arrayKeyReplacer(item, key, value) };
		if (item && typeof item === 'object') return { ...acc, [el]: keyReplacer(item, key, value) };

		return { ...acc, [el]: item };
	}, {} as T);

export const fetchingTransform = createTransform((inState: any) => keyReplacer(inState, 'isFetching', false));
