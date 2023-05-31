"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => {
        return (
          <div className="list-item" key={i}>
            <Link href={`/detail/${result[i]._id.toString()}`}>
              <h4>{result[i].title}</h4>
            </Link>
            <Link href={`/edit/${result[i]._id.toString()}`}>수정</Link>
            <p
              onClick={(e) => {
                console.log("요청 갔음");
                fetch("/api/post/delete", {
                  method: "POST",
                  body: result[i]._id.toString(),
                })
                  .then(async (response) => {
                    return response.json();
                  })
                  .then((response) => {
                    if (response === "삭제 안됨") {
                      return;
                    } else console.log(response, "요청쪽");
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  });
              }}
            >
              삭제
            </p>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
