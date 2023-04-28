import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "../../../lib/client";

import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '../../../lib/pinecone_client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../../../lib/pinecone_settings';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const setId = req.body['setId']
    const question = req.body['question']

    let text= ""

    const { data, error } = await supabase
        .from('dataset')
        .select('text')
        .eq('set_id', setId)


    for (let i = 0; i < data!.length; i++) {
        text += data![i].text + " "
    }


    const model = new OpenAI({ maxTokens: 1000, temperature: 0.1 });

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([text]);

    console.log(docs)

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: PINECONE_NAME_SPACE,
        textKey: 'text',
    });

    const qaChain = VectorDBQAChain.fromLLM(model, vectorStore);

    const answer = await qaChain.call({
        input_documents: docs,
        query: question
    });

    res.status(200).json({answer: answer })
}