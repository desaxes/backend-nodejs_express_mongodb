import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsBody, RequestWithQuery } from '../api-types'
import { GameCreateModel } from '../models/GameCreateModel'
import { GameUpdateModel } from '../models/GameUpdateModel'
import { GameQueryModel } from '../models/GameQueryModel'
import { GameViewModel } from '../models/GameViewModel'
import { URIParamsModel } from '../models/URIParamsModel'
import { StatusCodes } from '../StatusCodes'
import { dbType } from '../types'
import { gamesRepository } from '../repositories/games-repository'
import { inputValidationMiddleware } from '../middlewares/input-validation'
import { bodyValidationMiddleware } from '../middlewares/game-body-validation'
import { idValidationMiddleware } from '../middlewares/id-validation'

export const getGamesRouter = (db: dbType) => {
    const router = express.Router()
    router.get('/',
        (req: RequestWithQuery<GameQueryModel>, res: Response<GameViewModel[]>) => {
            res.json(gamesRepository.findByTerm(req.query.year, req.query.genre, req.query.title).map(game => {
                return {
                    id: game.id,
                    title: game.title,
                    genre: game.genre,
                    year: game.year
                }
            }))
        })
    router.get('/:id', (req: RequestWithParams<URIParamsModel>, res: Response<GameViewModel>) => {
        const foundedGame = gamesRepository.findById(+req.params.id)
        if (!foundedGame) {
            res.sendStatus(StatusCodes.NOT_FOUND)
            return
        }
        res.json(foundedGame)
    })
    router.post('/',
        bodyValidationMiddleware,
        inputValidationMiddleware,
        (req: RequestWithBody<GameCreateModel>, res: Response<GameViewModel>) => {
            const newGame = gamesRepository.createNewGame(req.body.title, req.body.genre, req.body.year)
            res.status(StatusCodes.CREATED).json(newGame)
        })
    router.delete('/:id',
        idValidationMiddleware,
        (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            const deleteGame = gamesRepository.deleteGame(req.params.id)
            if (!deleteGame) {
                res.sendStatus(StatusCodes.NOT_FOUND)
                return
            }
            res.sendStatus(StatusCodes.NO_CONTENT)
        })
    router.put('/:id',
        idValidationMiddleware,
        bodyValidationMiddleware,
        inputValidationMiddleware,
        (req: RequestWithParamsBody<URIParamsModel, GameUpdateModel>, res: Response<GameViewModel>) => {
            const gameUpdate = gamesRepository.updateGame(req.params.id, req.body.title, req.body.genre, req.body.year)
            if (!gameUpdate) {
                return res.sendStatus(StatusCodes.NOT_FOUND)
            }
            const game = gamesRepository.findById(+req.params.id)
            res.status(StatusCodes.OK).json(game)
        })
    return router
}