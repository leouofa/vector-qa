import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/client'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const setList = req.body['setList']
    const newSet = req.body['newSet']


    const { data, error } = await supabase
        .from('dataset')
        .select('text')
        .in('set_id', setList)

    let text= ""

    for (let i = 0; i < data!.length; i++) {
        text += data![i].text + " "
    }

    const { data: rsp_data, error: rsp_error } = await supabase
        .from('dataset')
        .insert({ set_id: newSet, text: text })
        .select()

    res.status(200).json({data: rsp_data, error: rsp_error})
}
