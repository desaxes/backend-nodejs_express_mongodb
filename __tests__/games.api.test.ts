import request from 'supertest'
import { app } from '../src/app';
import { GameCreateModel } from '../src/models/GameCreateModel';
import { db } from '../src/db';
const server = request(app)

const yGames = db.games.filter(e => e.year === '2020')
const game = {
    id: db.games[db.games.length - 1].id + 1,
    title: 'God of War',
    genre: 'Action',
    year: '2018'
}

describe('games', () => {

    it('should return 200 & array of games', async () => {
        await server
            .get('/games')
            .expect(200, db.games)
    });
    it('should return 200 & game with id=5', async () => {
        await server
            .get('/games/5')
            .expect(200, db.games[4])
    });
    it('should return 200 & 2020 games', async () => {
        await server
            .get('/games?year=2020')
            .expect(200, yGames)
    });
    it('should return 404', async () => {
        await server
            .get('/games/2323')
            .expect(404)
    });
    it('should return 204 or 404', async () => {
        await server
            .delete('/games/3')
            .expect(204 || 404)
    });
    it('should create new game', async () => {
        const data: GameCreateModel = { title: 'God of War', genre: 'Action', year: '2018' };
        await server
            .post('/games')
            .send(data)
            .expect(201, game)
    });
    it('should create new game(alt)', async () => {
        const data: GameCreateModel = { title: 'God of War:Ragnarok', genre: 'Action', year: '2022' };
        const response = await server
            .post('/games')
            .send(data)
            .expect(201)
        const createdGame = response.body
        expect(createdGame).toEqual({
            id: expect.any(Number),
            title: data.title,
            genre: data.genre,
            year: data.year
        })
        await server
            .get('/games/' + createdGame.id)
            .expect(200, createdGame)
    });
    it('should return 400', async () => {
        const data = { title: 'God of War', year: '2018' };
        await server
            .post('/games')
            .send(data)
            .expect(400)
    });
    it('should return 200 & updated game', async () => {
        await server
            .put('/games/2')
            .send({ title: 'Updated title', genre: 'Updated genre', year: 'Updated year' })
            .expect(200, db.games[1])
    })
})
