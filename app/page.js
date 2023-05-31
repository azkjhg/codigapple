import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import Image from "next/image";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  return <>안녕</>;
}
