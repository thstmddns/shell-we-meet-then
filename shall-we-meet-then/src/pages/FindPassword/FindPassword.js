import React, { useState } from "react";
import './FindPassword.css'
import axios from "axios";
import Swal from "sweetalert2";
import { ShiningLoginComponent } from "../Home/Home";

function FindPassword() {
  const [Email, setEmail] = useState('');


  const sendEmail = () => {

    axios({
      method: 'get',
      url: 'http://k7d105.p.ssafy.io/members/password',
      params:{email:Email},
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          // alert('비밀번호 찾기 이메일이 전송되었습니다.')
          Swal.fire({
            icon: "success",
            title: "이메일이 전송되었습니다",
            showConfirmButton: false,
            timer: 1300,
          });
    
        }
        else {
          Swal.fire({
            icon: "error",
            title: "비밀번호 찾기 실패",
            text: "없는 아이디입니다.",
          });
        }
      })
  }



  return (
    <div className="find-password-wrapper" >
      <ShiningLoginComponent>
      <div className="find-page">
        <div className="find-password-form">
          <div className="login-form">
            <input type="text" placeholder="E-mail" value={Email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={sendEmail}>Find Password</button>
          </div>
        </div>
      </div>
      </ShiningLoginComponent>



    </div>
  )
}

export default FindPassword
