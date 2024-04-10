import { GameQueryModel } from './models/GameQueryModel'
import { GameSearchModel } from './models/GameSearchModel'
import { game } from './types'
export const gameFunctions = {
    findByTerm(games: game[], year?: string, genre?: string, title?: string) {
        let foundedGames = games
        if (year) {
            foundedGames = foundedGames.filter(g => g.year === parseInt(year))
        }
        if (genre) {
            foundedGames = foundedGames.filter(g => g.genre === genre)
        }
        if (title) {
            foundedGames = foundedGames.filter(
                g => g.title.toLowerCase().indexOf(
                    (title as string).toLowerCase()) > -1)
        }
        return foundedGames
    }
}
export const setQueryConditions = (query: GameQueryModel) => {
    let conditions = []
    if (query.title) {
        conditions.push({ title: { $regex: query.title } })
    }
    if (query.genre) {
        conditions.push({ genre: query.genre })
    }
    if (query.year) {
        conditions.push({ year: +query.year })
    }
    if (query.devId) {
        conditions.push({ developerId: +query.devId })
    }
    return conditions.length ? { $and: conditions } : {}
}