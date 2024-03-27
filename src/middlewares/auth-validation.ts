import { header } from "express-validator";

const authDB = ['Basic YWRtaW46cXdlcnR5', 'Basic aGVsbG86d29ybGQ=', 'Basic d29ybGQ6aGVsbG8=']

export const authMiddleware = header('Authorization').isIn(authDB)