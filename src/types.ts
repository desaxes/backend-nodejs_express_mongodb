
export type game = {
    id: number, title: string, genre: string, year: number
}
export type dbType = {
    games: game[]
}
export type conditionsType = {
    $and: (
        { title: { $regex: string; }; genre?: undefined; year?: undefined; } |
        { genre: string; title?: undefined; year?: undefined; } |
        { year: number; title?: undefined; genre?: undefined; })[];
} | { $and?: undefined; }