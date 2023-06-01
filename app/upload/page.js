"use client";

import React, { useEffect, useState } from "react";
import { storage } from "/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Page = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const upload = () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("됐다.");
    });
  };

  const imageListRef = ref(storage, "image/");
  useEffect(() => {
    listAll(imageListRef).then((r) => {
      r.items.forEach((i) => {
        getDownloadURL(i).then((url) => {
          console.log(url);
        });
      });
    });
  }, []);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={upload}>버튼</button>
    </div>
  );
};

export default Page;
