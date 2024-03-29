import express from 'express';
import dotenv from 'dotenv';
import quotesRouter from '../app/routes/quotes';
import methodOverride from 'method-override';

dotenv.config();

const APP_PORT = process.env.APP_PORT || 4201;
const main: express.Application = express();

main.use(express.json());
main.use(express.urlencoded({ extended: false }));

main.use(methodOverride('_method'));

main.use(quotesRouter);

main.listen(APP_PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${APP_PORT}`);
});
