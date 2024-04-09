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