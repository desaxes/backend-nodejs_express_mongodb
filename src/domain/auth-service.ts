import { SECRET_KEY, address, pass } from "../../local"
import { emailAdapter } from "../adapters/email-adapter"
import { authRepository } from "../repositories/auth-repo"
import { user } from "../types"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const authService = {
    async createUser(login: string, email: string, password: string) {
        const passwordHash = await this._generateHash(password)
        const code = await this._generateConfirmCode()
        const user: user = {
            accountData: {
                login: login,
                email: email,
                password: passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                code: code,
                isConfirmed: false
            }
        }
        await authRepository.createUser(user)
        try {
            await emailAdapter.send({
                auth: {
                    user: address,
                    pass: pass
                },
                from: address,
                to: email,
                subject: 'Confirm Code',
                html: `<p>${code}</p>`
            })
        }
        catch (e) {
            console.log(e)
            authRepository.deleteUser(user)
            return null
        }
        return user.accountData
    },
    async login(login: string, password: string) {
        const user = await authRepository.login(login, password)
        if (user) {
            return this._generateJwt(user.accountData.login, user.accountData.email)
        }
        else {
            return null
        }
    },
    async checkAuth(token: string) {
        const splitToken = token.split(' ')[1]
        try {
            return jwt.verify(splitToken, SECRET_KEY)
        }
        catch (e) {
            return null
        }
    },
    async confirmEmail(code: number) {
        return await authRepository.confirmEmail(code)
    },
    async sendNewCode(email: string) {
        const code = await this._generateConfirmCode()
        const result = await authRepository.sendNewCode(email, code)
        await emailAdapter.send({
            auth: {
                user: address,
                pass: pass
            },
            from: address,
            to: email,
            subject: 'Confirm Code',
            html: `<p>${code}</p>`
        })
        return result
    },
    async _generateHash(password: string) {
        return await bcrypt.hash(password, 5)
    },
    async _generateConfirmCode() {
        return Math.floor(Math.random() * 999999 + 100000)
    },
    async _generateJwt(login: string, email: string) {
        return jwt.sign(
            { login, email },
            SECRET_KEY,
            { expiresIn: '24h' }
        )
    }
}