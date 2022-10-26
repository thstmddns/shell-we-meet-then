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
  // 이메일 인증용 state
  // 중복검사용
  const [isDuplicated, setIsDuplicated] = useState(true);
  // 인증메일 코드
  const [code, setCode] = useState('');
  // 인증메일 코드로 인증했는가
  const [checkCode, setCheckCode] = useState(false);




  // 회원가입 함수
  const signup = () => {
    if (isDuplicated) {
      alert('이메일 중복검사를 해주세요');
      return
    }

    if (!checkCode) {
      alert('이메일 인증을 진행해주세요');
      return
    }
    else {
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


  //이메일 중복 체크
  const checkDuplicatedEmail = () => {
    axios({
      method: 'get',
      url: '/members/check-email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: signUpEmail,
      },
    })
      .then(r => {
        if (r.data === true) {
          alert('이미 존재하는 이메일입니다');
        }
        else {
          setIsDuplicated(false);
        }
      })
      .catch(err => {

      })

  }

  //이메일 인증메일 보내기
  const authenticateEmail = () => {
    axios({
      method: 'get',
      url: '/members/auth/email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: signUpEmail,
      },
    })
      .then(() => {
        alert('인증메일이 전송되었습니다')
      })
  }


  // 이메일 인증메일 코드검사
  const checkAuthenticatedEmail = () => {
    axios({
      method: 'get',
      url: '/members/check-email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        code: code,
      },
    })
      .then(() => {
        setCheckCode(true);
      })
      .catch(err => {

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

            <div>
              <input type="text" placeholder="email address" value={signUpEmail}
                onChange={(e) => { setSignUpEmail(e.target.value) }} />
              <button onClick={checkDuplicatedEmail}>E-mail 중복검사</button>
              <button onClick={authenticateEmail}>E-mail인증 메일 받기</button>
            </div>

            <input type="text" placeholder="email address" value={code}
              onChange={(e) => { setCode(e.target.value) }} />
            <button onClick={checkAuthenticatedEmail}>E-mail인증코드 입력</button>



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