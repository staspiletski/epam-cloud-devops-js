import express from "express";
import dotenv from "dotenv";
import quotesRouter from "../app/routes/quotes";
import path from "path";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 8001;
const main: express.Application = express();

main.use(express.json());

main.use(quotesRouter);

main.use("/static", express.static(path.join(__dirname, "../../", "static")));

main.listen(APP_PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${APP_PORT}`);
});