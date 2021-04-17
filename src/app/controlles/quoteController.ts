import { Request, Response } from "express";
import userService from "../services/quoteServices";

const quoteController = {
	async readAll(req: Request, res: Response) {
		try {
			const quotes = await userService.readAll();
			res.status(200).json(quotes);
		} catch (error) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},

	async readRandom(req: Request, res: Response) {
		try {
			const quotes = await userService.readRandom();
			res.status(200).json(quotes);
		} catch (error) {
			console.error(error);
			res.status(404).json(error.message);
		}
	},
};

export default quoteController;
