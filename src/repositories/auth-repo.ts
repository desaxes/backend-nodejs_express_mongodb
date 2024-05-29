import { userDb } from "..";
import { user } from "../types";
import bcrypt from 'bcrypt'

export const authRepository = {
    async createUser(user: user) {
        const profile = await userDb.insertOne(user)
        return (profile)
    },
    async deleteUser(user: user) {
        await userDb.deleteOne({ accountData: { email: user.accountData.email } })
    },
    async confirmEmail(code: number) {
        const user = await userDb.findOne({
            emailConfirmation: {
                code: code,
                isConfirmed: false
            }
        })
        if (user) {
            const result = await userDb.updateOne({ _id: user._id },
                {
                    $set: {
                        emailConfirmation: {
                            isConfirmed: true
                        }
                    }
                }
            )
            return result
        }
        else {
            return null
        }
    },
    async sendNewCode(email: string, code: number) {
        const result = await userDb.updateOne({ "accountData.email": email },
            {
                $set: {
                    emailConfirmation: {
                        code: code,
                        isConfirmed: false
                    }
                }
            }
        )
        return result
    },
    async login(login: string, password: string) {
        const user = await userDb.findOne({ "accountData.login": login })
        if (!user) return null
        let comparePassword = bcrypt.compareSync(password, user.accountData.password)
        if (!comparePassword) return null
        return user
    }
}