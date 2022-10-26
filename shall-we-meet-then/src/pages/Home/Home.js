import React, { useEffect, useState } from "react";
import $ from "jquery";
import './Home.css';
import axios from 'axios';
import Button from "../../Components/Button";

function Home() {

  // 회원가입용 state
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordCheck, setSignUpPasswordCheck] = useState('');
  // 로그인용 state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // 회원가입 함수
  const signup = () => {
    if (signUpPassword === signUpPasswordCheck) {
      axios({
        method: 'post',
        url: '/members/join',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: signUpEmail,
          password: signUpPassword,
        },
      })
        .then(() => {

          changeForm();
        })
        .catch(error => {
          if (error.response.status === 401) {
            // setWrongInputData(true);
          }
        })
    }
    else {
      alert('비밀번호가 다릅니다.')
    }
  }

  // 로그인 함수
  const signIn = () => {

    axios({
      method: 'post',
      url: '/members/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: signUpEmail,
        password: signUpPassword,
      },
    })
      .then(res => {
        sessionStorage.setItem('accessToken', res.data)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // setWrongInputData(true);
        }
      })

  }



  // form 체인지를 위한 코드
  const changeForm = () => {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

  const stopEvent = () => {
    return false;
  }




  return (
    <div >
      {/* 회원가입 */}
      <div className="login-page">
        <div className="form">
          <form className="register-form" onSubmit={stopEvent}>
            <input type="text" placeholder="email address" value={signUpEmail}
              onChange={(e) => { setSignUpEmail(e.target.value) }} />
            <input type="password" placeholder="password" value={signUpPassword}
              onChange={(e) => { setSignUpPassword(e.target.value) }} />
            <input type="password" placeholder="password check" value={signUpPasswordCheck}
              onChange={(e) => { setSignUpPasswordCheck(e.target.value) }} />
            <button onClick={signup}>create</button>
            <p className="message">아이디가 있으신가요? &nbsp;&nbsp;&nbsp;<a onClick={changeForm} href="#">로그인</a></p>
          </form>




        {/* 로그인 */}
          <form className="login-form" onSubmit={stopEvent}>
            <input type="text" placeholder="username" value={signInEmail}
              onChange={(e) => { setSignInEmail(e.target.value) }} />
            <input type="password" placeholder="password" value={signInPassword}
              onChange={(e) => { setSignInPassword(e.target.value) }} />
            <button onClick={signIn}>login</button>
            <p className="message">아이디가 없으신가요?&nbsp;&nbsp;&nbsp;<a onClick={changeForm} href="#">회원가입</a></p>
          </form>







        </div>
      </div>




    </div>
  )
}

export default Home