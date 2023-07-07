import express from 'express';
import cors from 'cors';
import morgan from "morgan"
import 'express-async-errors'
import './db/index.mjs';

import userRouter from './routes/user.mjs';
import actorRoter from './routes/actor.mjs'
import movieRoter from './routes/movie.mjs'
import { errorHandler } from './middlewares/error.mjs';
import { handleNotFound } from './utils/helper.mjs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/actor', actorRoter)
app.use('/api/movie', movieRoter)

app.use('/*', handleNotFound)

app.use(errorHandler)


app.listen(PORT, () => {
	console.log(`Server is listen port http://localhost:${PORT}`);
});
