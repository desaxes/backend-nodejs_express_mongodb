import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsBody, RequestWithQuery } from '../api-types'
import { GameCreateModel } from '../models/GameCreateModel'
import { GameUpdateModel } from '../models/GameUpdateModel'
import { GameQueryModel } from '../models/GameQueryModel'
import { GameViewModel } from '../models/GameViewModel'
import { URIParamsModel } from '../models/URIParamsModel'
import { StatusCodes } from '../StatusCodes'
import { inputValidationMiddleware } from '../middlewares/input-validation'
import { bodyValidationMiddleware } from '../middlewares/game-body-validation'
import { idValidationMiddleware } from '../middlewares/id-validation'
import { authMiddleware } from '../middlewares/auth-validation'
import { app } from '../app'
import { gamesRepository } from '../repositories/games-repository'

export const getGamesRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<GameQueryModel>, res: Response<GameViewModel[]>) => {
            const collection = app.locals.collection
            try {
                const games = await collection.find({}).toArray()
                let sortGames = gamesRepository.findByTerm(games, req.query.year, req.query.genre, req.query.title)
                res.json(sortGames).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }

        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<GameViewModel>) => {
            const collection = app.locals.collection
            try {
                const game = await collection.findOne({ id: parseInt(req.params.id) })
                res.json(game).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        authMiddleware,
        bodyValidationMiddleware,
        inputValidationMiddleware,
        async (req: RequestWithBody<GameCreateModel>, res: Response<GameViewModel>) => {
            const collection = app.locals.collection
            try {
                const games = await collection.find({}).toArray()
                let lastId = games[games.length - 1].id + 1

                const newGame = await collection.insertOne(
                    {
                        id: lastId,
                        title: req.body.title,
                        genre: req.body.genre,
                        year: req.body.year
                    })
                res.status(StatusCodes.CREATED).json(newGame)
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/:id',
        authMiddleware,
        idValidationMiddleware,
        inputValidationMiddleware,
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            const collection = app.locals.collection
            try {
                await collection.deleteOne({ id: parseInt(req.params.id) })
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.put('/:id',
        idValidationMiddleware,
        authMiddleware,
        bodyValidationMiddleware,
        inputValidationMiddleware,
        async (req: RequestWithParamsBody<URIParamsModel, GameUpdateModel>, res: Response<GameViewModel>) => {
            const collection = app.locals.collection
            try {
                const updateGame = await collection.updateOne({ id: parseInt(req.params.id) },
                    {
                        $set: {
                            title: req.body.title,
                            genre: req.body.genre,
                            year: req.body.year
                        }
                    }
                )
                res.json(updateGame).status(StatusCodes.NOT_FOUND)
            }
            catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        })
    return router
}