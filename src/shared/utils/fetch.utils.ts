export const fetchAPI = (url: string, token?: string, body?: object, method?: string, headers?: object): Promise<any> =>
	fetch(url, {
		method: method ?? body ? 'POST' : 'GET',
		headers: {
			...(body && { 'Content-Type': 'application/json' }),
			...(token && { Authorization: `Bearer ${token}` }),
			...headers,
		},
		body: body && JSON.stringify(body),
	}).then((res) => res.json());

export const expandUri = (...expands: string[]): string =>
	expands.reduce((acc, el) => `${acc ? acc + '&' : ''}expand=${el}`, '');
