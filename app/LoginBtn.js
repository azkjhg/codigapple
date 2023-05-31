"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";

const LoginBtn = ({ session }) => {
  return (
    <>
      {session ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      )}
    </>
  );
};

export default LoginBtn;
