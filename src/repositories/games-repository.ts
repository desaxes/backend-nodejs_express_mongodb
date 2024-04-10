import { gameDb, devDb } from '..'
import { GameSearchModel } from '../models/GameSearchModel'
import { conditionsType } from '../types'

export const gameRepository = {
    async getGames(finalConditions: conditionsType, limit: number, offset: number) {
        const games = await gameDb.find<GameSearchModel>(finalConditions).skip(offset).limit(limit).toArray()
        const devs = await devDb.find().toArray()
        return games.map(e => {
            let developer = devs.find(d => d.id === e.developerId)
            return {
                title: e.title,
                genre: e.genre,
                year: e.year,
                developer: developer && developer.name
            }
        })
    },
    async getGameById(id: string) {
        const game = await gameDb.findOne<GameSearchModel | null>({ id: parseInt(id) })
        if (game) {
            const dev = await devDb.findOne({ id: game.developerId })
            return {
                title: game.title,
                genre: game.genre,
                year: game.year,
                developer: dev && dev.name
            }
        }
        else {
            return {}
        }
    },
    async createGame(title: string, genre: string, year: number, devId: number) {
        const games = await gameDb.find({}).toArray()
        let lastId = games[games.length - 1].id + 1
        const newGame = await gameDb.insertOne(
            {
                id: lastId,
                title: title,
                genre: genre,
                year: year,
                developerId: devId
            })
        return newGame
    },
    async removeGame(id: string) {
        await gameDb.deleteOne({ id: parseInt(id) })
    },
    async updateGame(id: string, title: string, genre: string, year: number, devId: number) {
        const updateGame = await gameDb.updateOne({ id: parseInt(id) },
            {
                $set: {
                    title: title,
                    genre: genre,
                    year: year,
                    developerId: devId
                }
            }
        )
        return updateGame
    }
}