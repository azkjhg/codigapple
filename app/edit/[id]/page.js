import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input
          name="title"
          placeholder="title"
          defaultValue={result && result.title}
        />
        <input
          name="content"
          placeholder="content"
          defaultValue={result && result.content}
        />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result && result._id.toString()}
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
