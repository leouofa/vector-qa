import { NextApiRequest, NextApiResponse } from 'next'

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const authHeader = req.headers.authorization
    const secretAuthKey = process.env.SECRET_AUTH_KEY

    if (!authHeader || authHeader !== `Bearer ${secretAuthKey}`) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    next()
}