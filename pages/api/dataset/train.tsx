import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/client';
import { authenticate } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await authenticate(req, res);

        const { setId, text } = req.body;
        const { data, error } = await supabase
            .from('dataset')
            .insert({ set_id: setId, text })
            .select();

        res.status(200).json({ data, error });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}