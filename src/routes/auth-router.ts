import { Request, Response, Router } from "express";
import { authService } from "../domain/auth-service";
import { registrationMiddleware } from "../middlewares/registration-validatior";
import { inputValidationMiddleware } from "../middlewares/input-validation";

export const authRouter = Router({})

authRouter.post('/registration',
    registrationMiddleware,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).send({ message: 'something wrong' })
        }
    })
authRouter.post('/login', async (req: Request, res: Response) => {
    const result = await authService.login(req.body.login, req.body.password)
    res.status(200).send(result)
})
authRouter.post('/confirm', async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)
    if (result) {
        res.status(200).send({ message: "Email Confirmed" })
    }
    else {
        res.status(400).send({ message: 'something wrong' })
    }
})
authRouter.post('/resend', async (req: Request, res: Response) => {
    const result = await authService.sendNewCode(req.body.email)
    res.status(200).send(result)
})
authRouter.get('/check', async (req: Request, res: Response) => {
    if (req.headers.authorization) {
        const result = await authService.checkAuth(req.headers.authorization)
        if(result){
            res.status(200).send(result)
        }
        else{
            res.status(401).send({message:'User is not authorized'})
        }
    }
})