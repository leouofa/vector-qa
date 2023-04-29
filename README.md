# VectorQA 🧮

VectorQA is an open-source web application that leverages pre-trained word embeddings from OpenAI to create vector-based question-answering systems. These word embeddings are used to convert natural language text into high-dimensional vector representations, which are then indexed in a Pinecone vector store for efficient and scalable retrieval.

This technology enables developers to easily build and deploy custom question-answering systems that can handle a wide variety of natural language queries, using state-of-the-art methods for semantic representation and similarity matching. By utilizing vector space models and advanced indexing techniques, VectorQA achieves high accuracy and flexibility in answering complex questions, while also supporting fast and parallelized query processing.


## Features
- Vector-based question-answering: VectorQA uses pre-trained embeddings from OpenAI to generate vector representations of natural language text, allowing for efficient and accurate question-answering.
- Easy integration with Supabase: VectorQA is designed to work seamlessly with Supabase, an open-source platform for building backend applications. The application includes several API routes for inserting, querying, and aggregating text data in a Supabase database table.
- Simple, flexible API: The VectorQA API is designed to be easy to use and highly flexible. Clients can submit a dataset of text documents to be indexed, along with a natural language question, and receive a response with the most relevant answer to the question.

## Getting started

### Development environment 

To set up the required environment variables in the development environment, you can create a .env file in the root directory of the project and set the following variables:

```makefile
SUPABASE_URL=<your Supabase URL>
SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key>
PINECONE_API_KEY=<your Pinecone API key>
PINECONE_ENVIRONMENT=<your Pinecone environment ID>
PINECONE_INDEX_NAME=<name of your Pinecone index>
OPENAI_API_KEY=<your OpenAI API key>
SECRET_AUTH_KEY=<secret authentication key>
```

Once you have these environment variables set up you can and run the following commands:

```bash
npm install
npm run dev
```

### Production environment
To set up the required environment variables in a production environment, you'll need to set them directly on the hosting platform where you're deploying the application. The specific process for setting environment variables will depend on the hosting platform you're using, so consult the platform's documentation for more information.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Authentication
- Set a `SECRET_AUTH_KEY` environment variable on the server running the application. This variable should contain a secret key that only authorized clients will know. You can do this using the command line or a configuration file, depending on your deployment environment.
- Modify the client applications that will access the API routes to include an Authorization header in requests with the value `Bearer {SECRET_AUTH_KEY}`, where `{SECRET_AUTH_KEY}` is the value of the `SECRET_AUTH_KEY` environment variable.

## API Routes
Here are 3 API routes available in this project:

### /api/train
This route inserts a new text document into a Supabase database table, given a dataset ID and text content in the request body.

The route expects a JSON payload in the request body with two properties: 
- `setId` – a string representing the ID of the dataset to insert the new document into)
- `text` – a string representing the text content of the new document. 
 
If the request is successfully authenticated, the route inserts the new document into the specified dataset and returns the inserted data in the response body as JSON.

### /api/aggregate
This route aggregates text content from multiple datasets stored in a Supabase database table and inserts the aggregated content into a new dataset, given an array of dataset IDs to aggregate and a new dataset ID in the request body.

The route expects a JSON payload in the request body with two properties: 
- `setList` – an array of strings representing the IDs of the datasets to aggregate
- `newSet` – a string representing the ID of the new dataset to create.

If the request is successfully authenticated, the route retrieves the text content of all documents in the datasets specified in `setList`, concatenates the text content into a single string, and inserts a new document into the specified new dataset with the concatenated text content. 

The inserted data is returned in the response body as JSON.

### /api/answer
This route uses a vector-based question-answering system to answer natural language questions about a set of documents stored in a Supabase database table, given a dataset ID and a question in the request body.

The route expects a JSON payload in the request body with two properties:
- `setId` – a string representing the ID of the dataset to search.
- `question` – (a string representing the natural language question to answer).

If the request is successfully authenticated, the route retrieves the text content of all documents in the specified dataset, computes vector representations of the documents using an embedding model from OpenAI, indexes the document vectors in a Pinecone vector store, and uses a language model from OpenAI to generate an answer to the input question.

The generated answer is returned in the response body as JSON.




## Acknowledgements
- [https://github.com/mayooear/gpt4-pdf-chatbot-langchain/](https://github.com/mayooear/gpt4-pdf-chatbot-langchain/)
- [https://github.com/bdcorps/langchain-pdf-qa](https://github.com/bdcorps/langchain-pdf-qa)
