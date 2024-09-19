import { connectToMongoDB } from "@/app/db/connection/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const client = new MongoClient(`${process.env.MONGODB_URI}`, {});

  try {
    const connection = await connectToMongoDB();
    const collection = connection.useDb("panel").collection("users");

    const formData = await req.json();
    // Extract user ID and other data from formData
    const { _id, ...updateData } = formData;

    if (!_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await client.close();
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
