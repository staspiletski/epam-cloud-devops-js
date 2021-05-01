import type { Quote } from '../models/quotes';
import { fileReader } from '../utilities/dataHelper';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const quoteService = {
	async readAll() {
		return fileReader('assets/data.json');
	},

	async readById(id: string) {
		const quotes = await fileReader('assets/data.json');
		return quotes.filter((quote: Quote) => quote.id === id);
	},

	async readRandom() {
		const quotes = await fileReader('assets/data.json');
		const random = Math.floor(Math.random() * quotes.length) + 1;
		return quotes[random - 1];
	},

	async readRandomByTag(tag = '') {
		let quotes: string[] = [];
		if (!tag) return quotes;
		const allQuotes = await fileReader('assets/data.json');
		return allQuotes.filter((quote: Quote) => quote.tags?.includes(tag) || quote.text.includes(tag));
	},

	async create(quote: Quote) {
		const { author, text, source, tags: tagsString } = quote;
		const tags = tagsString?.toString().split(',');

		const now = new Date();

		let newQuote = {
			id: uuidv4(),
			author: author,
			text: text,
			source: source,
			tags: tags,
			createdBy: now,
			createdAt: now,
			updatedAt: now,
			isDeleted: false,
		};

		const fileData = await fileReader('assets/data.json');
		let json = JSON.parse(JSON.stringify(fileData, null, 2));
		json.push(newQuote);
		await writeFile('assets/data.json', JSON.stringify(json, null, 2));
		return newQuote;
	},

	async removeAllQuotes() {
		await writeFile('assets/data.json', JSON.stringify([], null, 2));
	},

	async deleteById(id: string) {
		let deletedQuote = {};
		const fileData = await fileReader('assets/data.json');
		const parsedData = JSON.parse(fileData);

		const updatedData = parsedData.filter((quote: Quote) => {
			if (quote.id === id) {
				deletedQuote = quote;
			} else {
				return quote;
			}
		});

		await writeFile('assets/data.json', JSON.stringify(updatedData, null, 2));
		return deletedQuote;
	},
};

export default quoteService;
