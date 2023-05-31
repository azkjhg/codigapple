import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  try {
    const client = await connectDB;
    const db = client.db("forum");
    let result = await db
      .collection("comment")
      .find({ parent: new ObjectId(request.query.id) })
      .toArray();

    console.log(result, "서버 상황");

    result = await result.map((a) => {
      a._id = a._id.toString();
      return a;
    });

    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}
