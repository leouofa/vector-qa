import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const setId = req.body['setId']
    const text = req.body['text']

    const { data, error } = await supabase
        .from('dataset')
        .insert({ set_id: setId, text: text })
        .select()

    res.status(200).json({data: data, error: error})
}