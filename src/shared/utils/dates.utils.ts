export const dateFormatter = (_date: string): string => {
	const date = new Date(_date);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
};
