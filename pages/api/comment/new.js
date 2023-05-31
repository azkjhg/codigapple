import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (session) {
    request.body = JSON.parse(request.body);
    let commentBody = {
      comment: request.body.comment,
      parent: new ObjectId(request.body._id),
      author: session.user.email, // 기존 바디에 추가.
    };
    console.log(commentBody, "바디");

    try {
      const client = await connectDB;
      const db = client.db("forum");
      db.collection("comment").insertOne(commentBody);
      response.status(200).json("저장했음");
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  } else {
    response.status(400).json("로그인하셈");
  }
}
