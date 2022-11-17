import React, { useState } from "react";
import "./FindPassword.css";
import axios from "axios";
import Swal from "sweetalert2";
import { ShiningLoginComponent } from "../Home/Home";

function FindPassword({ stopEvent, changeToLoginForm, changeToRegisterForm }) {
  const [email, setEmail] = useState("");

  const sendEmail = () => {
    console.log("Props email test");

    axios({
      method: "get",
      url: "http://k7d105.p.ssafy.io/members/password",
      params: { email: email },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "이메일이 전송되었습니다",
          showConfirmButton: false,
          timer: 1300,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "비밀번호 찾기 실패",
          text: "없는 아이디입니다.",
        });
      }
    });
  };

  return (
    <>
      {/* <ShiningLoginComponent> */}
      <form className="register-form" onSubmit={stopEvent}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button onClick={sendEmail}>Find Password</button>

        <div style={{ display: "flex", marginLeft: "1.5vw" }}>
          <p
            className="message"
            style={{ marginRight: "2vw", marginLeft: "2vw" }}
          >
            <a onClick={changeToLoginForm} href="#">
              로그인
            </a>
          </p>

          <p
            className="message"
            style={{ marginRight: "1vw", marginLeft: "2vw" }}
          >
            <a onClick={changeToRegisterForm} href="#">
              회원가입
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export default FindPassword;
