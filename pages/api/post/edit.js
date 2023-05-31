import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(request, response) {
  if (request.method === "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(request.body._id) },
          { $set: { title: request.body.title, content: request.body.content } }
        );
      console.log(request.body);

      response.status(200).redirect(302, "/list");
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
