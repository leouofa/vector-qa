import { NextApiRequest, NextApiResponse } from 'next';

export const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const secretAuthKey = process.env.SECRET_AUTH_KEY;

    if (!authHeader || authHeader !== `Bearer ${secretAuthKey}`) {
        throw new Error('Unauthorized');
    }
};