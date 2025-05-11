import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pineConeIndex } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    console.log("QUERY", query);
    if (!query) {
      return NextResponse.json(
        { error: "Please provide a query" },
        { status: 400 }
      );
    }

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-ada-002",
    });

    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex: pineConeIndex,
    });

    const results = await vectorStore.similaritySearch(query, 4);

    const context = results.map((doc) => doc.pageContent).join("\n");

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o",
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      ` You are a helpful assistant. Use the following context to asnwer the question: {context}\n\n Question : {question}\n\n Answer concisely.`
    );

    const chain = RunnableSequence.from([prompt, model]);
    const response = await chain.invoke({
      context,
      question: query,
    });

    console.log("QUERY ANSWER ->", response.content);
    return NextResponse.json({ answer: response.content });
  } catch (error) {
    console.log("Error querying documents", error);
    return NextResponse.json(
      {
        error: "Failed to query",
      },
      { status: 500 }
    );
  }
}
