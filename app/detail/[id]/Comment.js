"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`)
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        setData(r);
      });
  }, [_id]);

  return (
    <div>
      <div>
        <hr></hr>
        {data &&
          data.map((a, i) => {
            return <div key={i}>{a.comment}</div>;
          })}
      </div>

      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: _id }),
          })
            .then((r) => {
              return r.json();
            })
            .then((r) => {
              console.log(r, "이건가?");

              setData(r);
            });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
