import { readFile, writeFile } from 'fs/promises';

export const fileReader = async (path: string) => {
	let resQuotes = [];
	const fileData = await readFile(path);

	try {
		// @ts-ignore
		const quotes = JSON.parse(fileData);
		if (Object.keys(quotes).length === 0) {
			//resQuotes = [{error: "Data field is empty"}];
			resQuotes = quotes;
		} else {
			resQuotes = quotes;
		}
	} catch (err) {
		console.error('Error parsing JSON string:', err);
		resQuotes = [{ error: "Error parsing JSON string 'assets/data.json'" }];
	}

	return resQuotes;
};
