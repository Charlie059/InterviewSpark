import { NextResponse } from 'next/server'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { CallbackManager } from 'langchain/callbacks'
import { LLMChain } from 'langchain/chains'
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts'
import { NextApiRequest } from 'next/types'

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY

export const config = {
  api: {
    bodyParser: false
  },
  runtime: 'experimental-edge'
}

// Helper function: Parse JSON request
async function parseJsonRequest(body: any) {
  const chunks = []

  for await (const chunk of body) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  return JSON.parse(buffer.toString())
}
export default async function handler(req: NextApiRequest) {
  const body = await parseJsonRequest(req.body)

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not defined.')
    }

    const encoder = new TextEncoder()
    const stream = new TransformStream()
    const writer = stream.writable.getWriter()

    const llm = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      temperature: 0.9,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: async token => {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        handleLLMEnd: async () => {
          await writer.ready
          await writer.close()
        },
        handleLLMError: async e => {
          await writer.ready
          await writer.abort(e)
        }
      })
    })

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate('You are a helpful assistant that answers questions as best you can.'),
      HumanMessagePromptTemplate.fromTemplate('{input}')
    ])
    const chain = new LLMChain({
      prompt: chatPrompt,
      llm: llm
    })
    chain.call({ input: body.query }).catch(console.error)

    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
