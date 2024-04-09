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
import { gamesService } from '../domain/games-service'
import { InsertOneResult, UpdateResult, WithId } from 'mongodb'

export const getGamesRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<GameQueryModel>, res: Response<any>) => {
            try {
                let games = await gamesService.getGames(req.query.year, req.query.genre, req.query.title, req.query.limit, req.query.page)
                res.json(games).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<GameViewModel|{}>) => {
            try {
                const game = await gamesService.getGameById(req.params.id)
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
        async (req: RequestWithBody<GameCreateModel>, res: Response<InsertOneResult>) => {
            try {
                const newGame = await gamesService.createGame(req.body.title, req.body.genre, req.body.year)
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
            try {
                await gamesService.removeGame(req.params.id)
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
        async (req: RequestWithParamsBody<URIParamsModel, GameUpdateModel>, res: Response<UpdateResult>) => {
            try {
                const updateGame = await gamesService.updateGame(req.params.id, req.body.title, req.body.genre, req.body.year)
                res.json(updateGame).status(StatusCodes.OK)
            }
            catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        })
    return router
}