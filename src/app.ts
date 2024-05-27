import express from 'express'
import { getGamesRouter } from './routes/games'
import { emailRouter } from './routes/email-router';

export const app = express()

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);
app.use("/games", getGamesRouter())
app.use("/email", emailRouter)



