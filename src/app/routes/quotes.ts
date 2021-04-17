import express, { Router } from "express";
import quoteController from "../controlles/quoteController";
import path from "path";

const router: Router = Router();

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/ping", (req, res) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		time: new Date().toISOString().slice(0, 10),
	};

	try {
		res.status(200).send(healthCheck);
	} catch (e) {
		healthCheck.message = e;
		res.status(503).send();
	}
});

router.use("/static", () => {
	express.static(path.join(__dirname, "../../../", "static"));
});

router.get("/api/quotes", quoteController.readAll);
router.get("/api/quotes/random", quoteController.readRandom);
/*router.get('/users/:id', usersController.getUserById);
router.put('/users/create', validators.validateCreateUser, usersController.createUser);
router.patch('/users/update', validators.validateUpdateUser, usersController.updateUser);
router.delete('/users/remove/:id', usersController.removeUser);*!/*/

/*router.use('*', (req, res, next) => {
	res.status(404).send('Sorry, the path is not found.');
	next();
});*/

export default router;
