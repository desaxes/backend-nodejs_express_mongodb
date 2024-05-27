import { Request, Response, Router } from "express";
import { emailAdapter } from "../adapters/email-adapter";

export const emailRouter = Router({})

emailRouter.post('/send', async (req: Request, res: Response) => {
    try {
        emailAdapter.send(req.body.options)
        res.send("Email Send")
    }
    catch (e) {
        console.log(e)
    }
})