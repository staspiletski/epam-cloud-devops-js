import { DATA } from "../../../assets/data";

const quoteService = {
	async readAll() {
		return DATA;
	},

	async readRandom() {
		const r = Math.floor(Math.random() * DATA.length) + 1;
		return DATA[r - 1];
	},
};

export default quoteService;
