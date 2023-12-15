import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsBody, RequestWithQuery } from './types'
import { GameCreateModel } from './models/GameCreateModel'
import { GameUpdateModel } from './models/GameUpdateModel'
import { GameQueryModel } from './models/GameQueryModel'
import { GameViewModel } from './models/GameViewModel'
import { URIParamsModel } from './models/URIParamsModel'
export const app = express()
const port = process.env.PORT || 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

export type game = {
    id: number, title: string, genre: string, year: string
}
type dbType = {
    games: game[]
}

enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404
}

export const db: dbType = {
    games: [
        { id: 1, title: 'Witcher', genre: 'Rpg', year: '2007' },
        { id: 2, title: 'Witcher 2', genre: 'Rpg', year: '2011' },
        { id: 3, title: 'Witcher 3', genre: 'ARpg', year: '2015' },
        { id: 4, title: 'Cyberpunk', genre: 'ARpg', year: '2020' },
        { id: 5, title: 'Gothic', genre: 'Rpg', year: '2001' },
        { id: 6, title: 'Gothic 2', genre: 'Rpg', year: '2002' },
        { id: 7, title: 'Tyranny', genre: 'CRpg', year: '2016' },
        { id: 8, title: 'Baldurs Gate 3', genre: 'CRpg', year: '2023' },
        { id: 9, title: 'Resident Evil 2 Remake', genre: 'Survival horror', year: '2019' },
        { id: 10, title: 'Resident Evil 3 Remake', genre: 'Survival horror', year: '2020' },
        { id: 11, title: 'Resident Evil 4 Remake', genre: 'Survival horror', year: '2023' },
        { id: 12, title: 'Resident Evil 5', genre: 'Survival horror', year: '2009' },
        { id: 13, title: 'Resident Evil 6', genre: 'Survival horror', year: '2012' },
        { id: 14, title: 'Pentiment', genre: 'Rpg', year: '2022' },
        { id: 15, title: 'Hogwarts Legacy', genre: 'ARpg', year: '2023' },
        { id: 16, title: 'GTA V', genre: 'Action', year: '2013' },
        { id: 17, title: 'The Elder Scrolls IV', genre: 'Rpg', year: '2006' },
        { id: 18, title: 'The Elder Scrolls V', genre: 'Rpg', year: '2011' },
        { id: 19, title: 'Vampyr', genre: 'ARpg', year: '2018' },
        { id: 20, title: 'Kingdom Come Deliverance', genre: 'ARpg', year: '2018' },
        { id: 21, title: 'Red Dead Redemption 2', genre: 'Action', year: '2018' },
        { id: 22, title: 'Days Gone', genre: 'Action', year: '2019' },
        { id: 23, title: 'Death Stranding', genre: 'Action', year: '2020' },
        { id: 24, title: 'Mass Effect', genre: 'ARpg', year: '2007' },
        { id: 25, title: 'Mass Effect 2', genre: 'ARpg', year: '2010' },
        { id: 26, title: 'Mass Effect 3', genre: 'ARpg', year: '2012' },
        { id: 27, title: 'NieR:Automata', genre: 'ARpg', year: '2017' },
        { id: 28, title: 'Final Fantasy VII Remake', genre: 'ARpg', year: '2020' },
        { id: 29, title: 'Life is Strange', genre: 'Interactive Movie', year: '2015' },
        { id: 30, title: 'Life is Strange: Before the Storm', genre: 'Interactive Movie', year: '2017' },
        { id: 31, title: 'Life is Strange 2', genre: 'Interactive Movie', year: '2018' },
        { id: 32, title: 'Life is Strange: True Colors', genre: 'Interactive Movie', year: '2021' },
        { id: 33, title: 'Dead Island', genre: 'ARpg', year: '2011' },
        { id: 34, title: 'Dead Island 2', genre: 'ARpg', year: '2023' },
        { id: 35, title: 'Heavy Rain', genre: 'Interactive Movie', year: '2010' },
        { id: 36, title: 'Dying Light', genre: 'Survival horror', year: '2015' },
        { id: 37, title: 'Dying Light 2: Stay Human', genre: 'Survival horror', year: '2022' },
        { id: 38, title: 'Horizon Zero Dawn', genre: 'ARpg', year: '2015' },
        { id: 39, title: 'Horizon Forbidden West', genre: 'ARpg', year: '2022' },
        { id: 40, title: 'Disco Elysium', genre: 'Rpg', year: '2019' },
        { id: 41, title: 'Resident Evil 7', genre: 'Survival horror', year: '2017' },
        { id: 42, title: 'Resident Evil:Village', genre: 'Survival horror', year: '2021' },
        { id: 43, title: 'Control', genre: 'Action', year: '2019' },
        { id: 44, title: 'Dragon Age:Origins', genre: 'Rpg', year: '2009' },
        { id: 45, title: 'Dragon Age 2', genre: 'Rpg', year: '2011' },
        { id: 46, title: 'Dragon Age:Inquisition', genre: 'Rpg', year: '2014' },
        { id: 47, title: 'Elden Ring', genre: 'ARpg', year: '2022' },
    ]
}

app.get('/', (req, res) => {
    res.send(
        'Hell')
})
app.get('/games',
    (req: RequestWithQuery<GameQueryModel>, res: Response<GameViewModel[]>) => {
        let foundedGames = db.games
        if (req.query.year) {
            foundedGames = foundedGames.filter(g => g.year === req.query.year)
        }
        if (req.query.genre) {
            foundedGames = foundedGames.filter(g => g.genre === req.query.genre)
        }
        if (req.query.title) {
            foundedGames = foundedGames.filter(
                g => g.title.toLowerCase().indexOf(
                    (req.query.title as string).toLowerCase()) > -1)
        }
        res.json(foundedGames.map(game => {
            return {
                id: game.id,
                title: game.title,
                genre: game.genre,
                year: game.year
            }
        }))
    })
app.get('/games/:id', (req: RequestWithParams<URIParamsModel>, res: Response<GameViewModel>) => {
    const foundedGame = db.games.find(g => g.id === +req.params.id)
    if (!foundedGame) {
        res.sendStatus(StatusCodes.NOT_FOUND)
        return
    }
    res.json(foundedGame)
})
app.post('/games', (req: RequestWithBody<GameCreateModel>, res: Response<GameViewModel>) => {
    if (!req.body.title || !req.body.genre || !req.body.year) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
        return
    }
    const game = {
        id: db.games[db.games.length - 1].id + 1,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    }
    db.games.push(game)
    res.status(StatusCodes.CREATED).json(game)
})
app.delete('/games/:id', (req: RequestWithParams<URIParamsModel>, res) => {
    const foundedIndex = db.games.findIndex(g => g.id === +req.params.id)
    if (foundedIndex === -1) {
        res.sendStatus(StatusCodes.NOT_FOUND)
        return
    }
    db.games.splice(foundedIndex, 1)
    res.sendStatus(StatusCodes.NO_CONTENT)
})
app.put('/games/:id', (req: RequestWithParamsBody<URIParamsModel, GameUpdateModel>,
    res: Response<GameViewModel>) => {
    const foundedGame = db.games.find(g => g.id === +req.params.id)
    if (!foundedGame || !req.params.id) {
        res.sendStatus(StatusCodes.NOT_FOUND)
        return
    }
    if (req.body.title && req.body.genre && req.body.year) {
        foundedGame.title = req.body.title
        foundedGame.genre = req.body.genre
        foundedGame.year = req.body.year
    }
    else {
        res.sendStatus(StatusCodes.BAD_REQUEST)
        return
    }
    res.status(StatusCodes.OK).json(foundedGame)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 