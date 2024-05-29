
export type game = {
    id: number, title: string, genre: string, year: number
}
export type dbType = {
    games: game[]
}
export type mailOptions = {
    auth: {
        user: string,
        pass: string
    },
    from: string,
    to: string,
    subject: string,
    html: string
}
export type conditionsType = {
    $and: (
        { title: { $regex: string; }; genre?: undefined; year?: undefined; developerId?: undefined } |
        { genre: string; title?: undefined; year?: undefined; developerId?: undefined } |
        { year: number; title?: undefined; genre?: undefined; developerId?: undefined } |
        { developerId: number; title?: undefined; genre?: undefined; year?: undefined })[];
} | { $and?: undefined; }


export type user = {
    accountData: {
        login: string,
        email: string,
        password: string,
        createdAt: Date
    }
    emailConfirmation: {
        code: number,
        isConfirmed: boolean
    }
}