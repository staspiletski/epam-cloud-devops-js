import { Request, Response } from 'express';
import quoteService from '../services/quoteServices';

const quoteController = {
	async readAll(req: Request, res: Response) {
		try {
			console.log(' readAll ');
			const quotes = await quoteService.readAll();
			res.status(200).json(quotes);
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async readById(req: Request, res: Response) {
		console.log(' readById ');
		try {
			const id = req.params['id'];
			const quote = await quoteService.readById(id);
			quote && quote.length !== 0 ? res.status(200).json(quote) : res.status(404).json('Quote not found');
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async updateById(req: Request, res: Response) {
		console.log(' updateById ');
		try {
			console.log(' updateById ', req.body);
			const id = req.params['id'];
			const quote = await quoteService.readById(id);
			quote && quote.length !== 0 ? res.status(200).json(quote) : res.status(404).json('Quote not found');
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async readRandom(req: Request, res: Response) {
		try {
			let quotes = [];
			let tag = '';
			if (req.query && req.query.tag) {
				tag = (req.query as any).tag;
			}

			if (req.query.tag) {
				quotes = await quoteService.readRandomByTag(tag);
			} else {
				quotes = await quoteService.readRandom();
			}

			res.status(200).json(quotes);
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async createQuotes(req: Request, res: Response) {
		console.log('  createQuotes ');
		try {
			const { author, text, source, tags } = req.body;
			const quote = await quoteService.create({ author, text, source, tags });
			res.status(201).json(quote);
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async createAwsQuote(req: Request, res: Response) {
		console.log('  createAwsQuote  ');
		try {
			const { author, text, from, firstName, email, templateName } = req.body;
			const quote = await quoteService.createAwsQuote(author, text, from, firstName, email, templateName);
			res.status(201).json(quote);
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async removeAllQuotes(req: Request, res: Response) {
		try {
			await quoteService.removeAllQuotes();
			res.status(201).json({ text: 'All Quotes were removed.' });
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async deleteById(req: Request, res: Response) {
		try {
			console.log(' deleteById ');
			const id = req.params['id'];
			const quote = await quoteService.deleteById(id);
			res.status(200).json(quote);
		} catch (error: any) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},
};

export default quoteController;
