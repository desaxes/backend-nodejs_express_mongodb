import { gameRepository } from '../repositories/games-repository'

export const gamesService = {
    async getGames(year?: string, genre?: string, title?: string, limit?: string, page?: string) {
        let conditions = []
        let lim = limit || 5
        let offset = (page ? +page : 1) * +lim - +lim
        if (title) {
            conditions.push({ title: { $regex: title } })
        }
        if (genre) {
            conditions.push({ genre: genre })
        }
        if (year) {
            conditions.push({ year: +year })
        }
        let finalConditions = conditions.length ? { $and: conditions } : {}
        return await gameRepository.getGames(finalConditions, +lim, offset)
    },
    async getGameById(id: string) {
        return gameRepository.getGameById(id)
    },
    async createGame(title: string, genre: string, year: number) {
        return gameRepository.createGame(title, genre, year)
    },
    async removeGame(id: string) {
        return gameRepository.removeGame(id)
    },
    async updateGame(id: string, title: string, genre: string, year: number) {
        return gameRepository.updateGame(id, title, genre, year)
    }
}