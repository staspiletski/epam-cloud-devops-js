import { Router } from 'express';
import quoteController from '../controlles/quoteController';
import path from 'path';

const router: Router = Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/ping', (req, res) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: 'OK',
		time: new Date().toISOString().slice(0, 10),
	};

	try {
		res.status(200).send(healthCheck);
	} catch (e: any) {
		healthCheck.message = e;
		res.status(503).send();
	}
});

router.get('/api/quotes', quoteController.readAll);
router.get('/api/quotes/random', quoteController.readRandom);
router.get('/api/quotes/:id', quoteController.readById);
router.get('/api/new-quote', (req, res) => res.sendFile(path.join(__dirname, '../../app/pages/new-quote.html')));
router.get('/api/update-quote', (req, res) => res.sendFile(path.join(__dirname, '../../app/pages/update-quote.html')));
router.post('/api/quotes', quoteController.createQuotes);
router.put('/api/quotes/:id', quoteController.updateById);
router.get('/api/remove-all-quotes', quoteController.removeAllQuotes);
router.get('/api/delete-quote', (req, res) => res.sendFile(path.join(__dirname, '../../app/pages/delete-quote.html')));
router.delete('/api/quotes:/id', quoteController.deleteById);
router.get('/api/aws/new-quote', (req, res) => res.sendFile(path.join(__dirname, '../../app/pages/new-aws-quote.html')));
router.post('/api/aws/new-quote', quoteController.createAwsQuote);

export default router;
