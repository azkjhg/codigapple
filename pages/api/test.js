import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  console.log(new Date());
  console.log(req.body);
  db.collection("post").insertOne(req.body);
  res.status(200).json(result);
}
