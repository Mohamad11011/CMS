import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const client = new MongoClient(`${process.env.MONGODB_URI}`, {});

  try {
    await client.connect();
    const database = client.db("panel");
    const collection = database.collection("users");

    const { id } = await req.json();

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
