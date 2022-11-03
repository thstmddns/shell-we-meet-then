import React, { useState } from "react";
import './FindPassword.css'
import axios from "axios";



function FindPassword() {
  const [Email, setEmail] = useState('');


  const sendEmail = () => {

    axios({
      method: 'get',
      url: 'http://k7d105.p.ssafy.io:8080/members/password',
      params:{email:Email},
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert('비밀번호 수정 이메일이 전송되었습니다.')
        }
        else {
          alert('없는 아이디입니다')
        }
      })
  }




  return (
    <div className="landing__bg" >
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type="text" placeholder="E-mail" value={Email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={sendEmail}>비밀번호 찾기</button>
          </div>
        </div>
      </div>




    </div>
  )
}

export default FindPassword
