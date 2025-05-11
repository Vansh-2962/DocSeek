import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pineConeIndex } from "@/utils/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    // first get the file from the request.
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded!" }, { status: 400 });
    }

    // load the document.
    let docs: Document[];
    if (file.type === "application/pdf") {
      const pdfLoader = new PDFLoader(file);
      docs = await pdfLoader.load();
    } else if (file.type === "text/plain") {
      const textLoader = new PDFLoader(file);
      docs = await textLoader.load();
    } else {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 }
      );
    }

    // split the documents into chunks.
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splits = await splitter.splitDocuments(docs);
    console.log("[SPLITS]", splits);
    // initialized my pinecone db in utils/db.ts

    // generate embeddings
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "text-embedding-3-large",
    });

    // store them in the pinecone db
    await PineconeStore.fromDocuments(splits, embeddings, {
      pineconeIndex: pineConeIndex,
      namespace: randomUUID(),
    });

    // return the response
    return NextResponse.json({ msg: "Documents processes successfully" });
  } catch (error) {
    console.error("Error processing the document", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
