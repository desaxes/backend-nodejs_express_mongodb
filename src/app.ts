import express from 'express'
import { getGamesRouter } from './routes/games'

export const app = express()

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);
app.use("/games", getGamesRouter())


