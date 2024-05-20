import express from 'express';
import cors from 'cors';
import morgan from "morgan"
import 'express-async-errors'
import './db/index.mjs';

import userRouter from './routes/user.mjs';
import actorRouter from './routes/actor.mjs'
import movieRouter from './routes/movie.mjs'
import reviewRouter from './routes/review.mjs'
import adminRouter from './routes/admin.mjs'

import { errorHandler } from './middlewares/error.mjs';
import { handleNotFound } from './utils/helper.mjs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter)
app.use('/api/movie', movieRouter)
app.use('/api/review', reviewRouter)
app.use('/api/admin', adminRouter)

app.use('/*', handleNotFound)

app.use(errorHandler)


app.listen(PORT, () => {
	console.log(`Server is listen port http://localhost:${PORT}`);
});
