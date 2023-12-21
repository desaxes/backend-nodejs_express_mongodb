import { db } from "../db"

export const gamesRepository = {
    findById(id: number) {
        return db.games.find(g => g.id === id)
    },
    findByTerm(year?: string, genre?: string, title?: string) {
        let foundedGames = db.games
        if (year) {
            foundedGames = foundedGames.filter(g => g.year === year)
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
    },
    createNewGame(title: string, genre: string, year: string) {
        const game = {
            id: db.games[db.games.length - 1].id + 1,
            title: title,
            genre: genre,
            year: year
        }
        db.games.push(game)
        return (game)
    },
    deleteGame(id: string) {
        const foundedIndex = db.games.findIndex(g => g.id === +id)
        if (foundedIndex === -1) {
            return false
        }
        else {
            db.games.splice(foundedIndex, 1)
            return true
        }
    },
    updateGame(id: string, title: string, genre: string, year: string) {
        const foundedGame = db.games.find(g => g.id === +id)
        if (!foundedGame) {
            return false
        }
        foundedGame.title = title
        foundedGame.genre = genre
        foundedGame.year = year
        return true
    }
}