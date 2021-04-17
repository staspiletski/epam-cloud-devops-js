import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const main = express();
const APP_PORT = process.env.APP_PORT || 8001;

main.get('/', (req, res) => res.send('Express + TypeScript Server'));
main.listen(APP_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${APP_PORT}`);
});
