import { connectDB } from "@/util/database";
import React from "react";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

const List = async () => {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  result = await result.map((a) => {
    a._id = a._id.toString();
    return a;
  });

  return (
    <div className="list-bg">{result && <ListItem result={result} />}</div>
  );
};

export default List;
