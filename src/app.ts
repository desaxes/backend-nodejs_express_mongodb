import express from 'express'
import { getGamesRouter } from './routes/games'
import { emailRouter } from './routes/email-router';
import { authRouter } from './routes/auth-router';

export const app = express()

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);
app.use("/games", getGamesRouter())
app.use("/email", emailRouter)
app.use("/auth", authRouter)



