import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(request, response) {
  if (request.method == "POST") {
    let session = await getServerSession(request, response, authOptions);
    // console.log(session, "세션");

    /// auth 부분
    ////////////////////////////////
    /// db 부분
    const db = (await connectDB).db("forum");
    let preResult = await db
      .collection("post")
      .findOne({ _id: new ObjectId(request.body) });
    // console.log(preResult.author);
    console.log("데이터", session.user.email, preResult.author);
    if (session.user.email == preResult.author) {
      console.log("동일인물");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.body) });
      return response.status(200).json("삭제 완료");
    }
    return response.status(400).json("삭제 안됨");
  }
}
