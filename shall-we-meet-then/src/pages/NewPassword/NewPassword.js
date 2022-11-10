import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';





function NewPassword() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const { uuid } = useParams();


  const passwordUpdate = () => {
    console.log(uuid)

    if (password === passwordCheck) {
      axios({
        method: 'put',
        url: 'http://k7d105.p.ssafy.io:8080/members/password',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email:email,
          nextPassword: password,
          uuid:uuid
        },
      }).then(r=>{
        console.log(r)
        navigate('/')
      })
    }
    else {
      alert('비밀번호가 다릅니다.')
    }

  }


  return (
    <div className="landing__bg" >
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type='emil' placeholder="email" value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <input type='password' placeholder="new_password" value={password}
              onChange={(e) => { setPassword(e.target.value) }} />
            <input type='password' placeholder="check_password" value={passwordCheck}
              onChange={(e) => { setPasswordCheck(e.target.value) }} />
            <button onClick={passwordUpdate}>비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </div>




  )
}

export default NewPassword