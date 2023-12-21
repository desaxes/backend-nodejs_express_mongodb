import express from 'express'
import { getGamesRouter } from './routes/games'
import { db } from './db'

export const app = express()
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
app.use("/games", getGamesRouter(db))


