import express from 'express';
import cros from 'cors';
import './db/index.mjs';

import userRouter from './routes/user.mjs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/user', userRouter);

app.post(
	'/sign-in',
	(req, res, next) => {
        const {email, password} = req.body
        if (!email || !password) return res.status(401).json({error: 'email/password is missing!'})

		next();
	},
	(req, res) => {
		res.send('<h1>All values is ok</h1>');
	},
);

app.listen(PORT, () => {
	console.log(`Server is listen port http://localhost:${PORT}`);
});
