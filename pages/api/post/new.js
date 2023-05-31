import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  console.log(session, " 왜 안되노");
  if (session) {
    request.body.author = session.user.email; // 기존 바디에 추가.
  }
  console.log(request.body, "바디");

  try {
    const client = await connectDB;
    const db = client.db("forum");
    db.collection("post").insertOne(request.body);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}
