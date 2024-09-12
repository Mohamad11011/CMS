// src/app/api/users/route.ts
import clientPromise from '@/app/lib/db/connection/mongodb';
import { NextResponse } from 'next/server';

interface User {
  name: string;
  email: string;
  _id?: any;
  password?: any;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('panel');
    const collection = db.collection<any>('users');
    console.log(collection)
    const users = await collection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('Panel');
    const collection = db.collection<User>('users');
    const newUser: User = await request.json();
    const result = await collection.insertOne(newUser);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
