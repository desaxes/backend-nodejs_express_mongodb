
export type game = {
    id: number, title: string, genre: string, year: number
}
export type dbType = {
    games: game[]
}
export type conditionsType = {
    $and: (
        { title: { $regex: string; }; genre?: undefined; year?: undefined; developerId?: undefined } |
        { genre: string; title?: undefined; year?: undefined; developerId?: undefined } |
        { year: number; title?: undefined; genre?: undefined; developerId?: undefined } |
        { developerId: number; title?: undefined; genre?: undefined; year?: undefined })[];
} | { $and?: undefined; }