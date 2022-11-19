import React, { ChangeEvent, useEffect, useState } from "react";
import $ from "jquery";
import './Home.css';
import axios from 'axios';
// import Button from "../../Components/Button";
import { InfoMsg } from './InfoMsg'
import { userInfo } from "os";
import { sign } from "crypto";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Swal from "sweetalert2";

interface UserInfo {
  email: string; 
  password: string;
}

interface RegisterUserInfo extends UserInfo{
  password2: string; 
  isDuplicated: boolean; 
}

function Home() {
  const navigate = useNavigate();

  // 회원가입용 state
  const [signUpUser, setSignUpUser] = useState<RegisterUserInfo>({email:'', password:'', password2:'', isDuplicated:false});

  // 로그인용 state
  const [user, setUser] = useState<UserInfo>({email:"", password:""});

  const goFindPassword = () => {
    navigate("/find-password");
  };

  // 회원가입 함수
  const onSignUpBtn = () => {
    if (signUpUser.isDuplicated) {
      // alert('이메일 중복검사를 해주세요');
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "이메일 중복검사를 해주세요",
      });
      return
    }
    else {
      if (signUpUser.password === signUpUser.password2) {
        axios({
          method: 'post',
          url: "http://k7d105.p.ssafy.io:80/members/join",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: signUpUser.email, 
            password: signUpUser.password,
          },
        })
          .then((r) => {
            console.log(r);

            if (r.data) {
              changeForm();
            } else {
              // alert('이메일 또는 비밀번호 형식이 맞지 않습니다.')
              Swal.fire({
                icon: "error",
                title: "회원가입 실패",
                text: "이메일 또는 비밀번호 형식이 맞지 않습니다.",
              });
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              // setWrongInputData(true);
            }
          });
      } else {
        // alert('비밀번호가 다릅니다.')
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: "비밀번호가 다릅니다.",
        });
      }
    }
  }

  // 로그인 함수
  const onSignInBtn = () => {

    axios({
      method: "post",
      url: "http://k7d105.p.ssafy.io:80/members/login",
      headers: {
        "Content-Type": "application/json",
        // withCredentials: true
      },
      data: {
        email: user.email,
        password: user.password,
      },
    })
      .then((res) => {
        if (res.data === true) {
          sessionStorage.setItem("accessToken", res.headers.authorization!);
          navigate("/main");
        } else {
          // alert('존재하지 않는 아이디 이거나 잘못된 비밀번호입니다')
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "아이디 또는 비밀번호를 다시 확인해주세요!",
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          // setWrongInputData(true);
        }
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "아이디 또는 비밀번호를 다시 확인해주세요!",
        });


      })
  }


  //이메일 중복 체크
  const checkDuplicatedEmail = () => {
    if (signUpUser.email === '') {
      // alert('이메일을 입력해주세요');
      Swal.fire({
        icon: "error",
        title: "검증 실패",
        text: "이메일을 입력해주세요",
      });
      return
    }
    axios({
      method: 'get',
      url: "http://k7d105.p.ssafy.io:80/members/check-email",
      params: {
        email: signUpUser.email,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        if (r.data === true) {
          setSignUpUser({...signUpUser, isDuplicated: true});
          Swal.fire({
            icon: "error",
            title: "가입 실패",
            text: "이미 존재하는 이메일입니다",
          });
        }
        else {
          setSignUpUser({...signUpUser, isDuplicated: false});
        }
      })
      .catch(err => {
        console.log("Error")
      })
  }

  // form 체인지를 위한 코드
  const changeForm = () => {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");

    // setSignInEmail("");
    // setSignInPassword("");
    // setSignUpEmail("");
    // setSignUpPassword("");
    // setSignUpPasswordCheck("");

  }

  const stopEvent = () => {

    return false;
  }

  return (
    <>
    <div className="landing__bg">
      {/* 회원가입 */}
      <div className="login-page">

      <div style={{ display: "flex", marginLeft:"-7vw", marginTop:"-28vh", marginBottom:"-21vh"}}>
          <img
            alt=""
            src={process.env.PUBLIC_URL + "/assets/icon-img/logo_4.png"}
          />
          <img
            style={{ width: "10vw", height: "12vh", marginTop:"21.5vh", marginLeft:"-5vw"}}
            alt=""
            src={process.env.PUBLIC_URL + "/assets/icon-img/then-logo.png"}
          />
        </div>


      <ShiningLoginComponent>
        <div className="form">
          <form className="register-form" onSubmit={stopEvent}>
            
            <input type="text" 
              style={{margin:'0 0 0 0'}} 
              placeholder="email address" 
              value={signUpUser.email}
              onChange={(e) => { setSignUpUser({...signUpUser, email: e.target.value})}}
              onBlur={checkDuplicatedEmail} /> 
            {
              signUpUser.isDuplicated === false 
              ? <></> 
              : <InfoMsg check={signUpUser.isDuplicated} />
            }
            <input 
              type="password" 
              style={{margin:'15px 0 15px 0'}} 
              placeholder="password" 
              value={signUpUser.password}
              onChange={(e) => { setSignUpUser({...signUpUser, password: e.target.value})}} />
            <input 
              type="password" 
              placeholder="password check" 
              value={signUpUser.password2}
              onChange={(e) => { setSignUpUser({...signUpUser, password2: e.target.value})}} 
            />
            <button onClick={onSignUpBtn}>create</button>
            <p className="message">아이디가 있으신가요? &nbsp;&nbsp;&nbsp;<a onClick={changeForm} href="#">로그인</a></p>
          </form>

          {/* 로그인 */}
          <form className="login-form" onSubmit={stopEvent}>
            <input 
              type="text" 
              placeholder="username" 
              value={user.email}
              onChange={(e) => { setUser({...signUpUser, email: e.target.value})}} 
            />
            <input 
              type="password" 
              placeholder="password" 
              value={user.password}
              onChange={(e) => { setUser({...signUpUser, password: e.target.value})}}
            />
            <button onClick={onSignInBtn}>login</button>
            <p className="message">
                아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
                <a onClick={changeForm} href="#">
                  회원가입
                </a>
              </p>
              <p className="message">
                비밀번호가 기억나지 않으신가요?&nbsp;&nbsp;&nbsp;{" "}
                <a style={{ cursor: "pointer" }} onClick={goFindPassword}>
                  비밀번호 찾기
                </a>
              </p>
          </form>
        </div>
        </ShiningLoginComponent>
      </div>
    </div>
    </>
  )
}

export default Home;

export const ShiningLoginComponent = styled.div`
  width: 26.5rem;
  height: 30rem;
  border-radius: 3rem;
  box-shadow: 0.2rem 0.2rem 1.2rem var(--pink),
    -0.2rem -0.2rem 1.2rem var(--pink);
  padding: 1rem;
  display: grid;
  grid-template-columns: 17.6rem 19rem 20.4rem;
  grid-template-rows: repeat(autofit, -webkit-min-content);
  grid-template-rows: repeat(autofit, min-content);
  grid-column-gap: 5rem;
  grid-row-gap: 2.5rem;
  align-items: center;

  margin-right: 30vw;
  margin-top: 6vh;
  margin-bottom: 50vh;
`;