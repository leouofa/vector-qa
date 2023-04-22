import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "../../../lib/client";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const setId = req.body['setId']

    const { data, error } = await supabase
        .from('dataset')
        .select('text')
        .eq('set_id', setId)

    res.status(200).json({data: data, error: error})
}