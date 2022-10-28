import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


 


function NewPassword() {

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();


  const passwordUpdate = () => {

    if (password === passwordCheck) {
      axios({
        method: 'put',
        url: '/members/password',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          nextPassword: password,
        },
      }).then(navigate('/'))
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