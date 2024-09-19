import { connectToMongoDB } from "@/app/db/connection/mongodb";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const client = new MongoClient(`${process.env.MONGODB_URI}`, {});

  try {
    const connection = await connectToMongoDB();
    const collection = connection.useDb("panel").collection("users");

    const formData = await req.json();

    const result = await collection.insertOne(formData);

    await client.close();
    return NextResponse.json(
      { message: "Data saved successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
