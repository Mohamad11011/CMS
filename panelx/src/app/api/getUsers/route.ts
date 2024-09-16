import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const client = new MongoClient(`${process.env.MONGODB_URI}`, {});

  try {
    await client.connect();
    const database = client.db("panel");
    const collection = database.collection("users");
    const allData = await collection.find().toArray();
    await client.close();

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
