import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/client'
import { authenticate } from '../../../lib/auth'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    authenticate(req, res, async () => {
        const setId = req.body['setId']
        const text = req.body['text']

        const { data, error } = await supabase
            .from('dataset')
            .insert({ set_id: setId, text: text })
            .select()

        res.status(200).json({data: data, error: error})
    })
}