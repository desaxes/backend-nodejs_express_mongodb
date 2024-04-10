import { setQueryConditions } from '../functions'
import { GameQueryModel } from '../models/GameQueryModel'
import { gameRepository } from '../repositories/games-repository'

export const gamesService = {
    async getGames(query: GameQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await gameRepository.getGames(finalConditions, +lim, offset)
    },
    async getGameById(id: string) {
        return gameRepository.getGameById(id)
    },
    async createGame(title: string, genre: string, year: number, devId: number) {
        return gameRepository.createGame(title, genre, year, devId)
    },
    async removeGame(id: string) {
        return gameRepository.removeGame(id)
    },
    async updateGame(id: string, title: string, genre: string, year: number, devId: number) {
        return gameRepository.updateGame(id, title, genre, year, devId)
    }
}