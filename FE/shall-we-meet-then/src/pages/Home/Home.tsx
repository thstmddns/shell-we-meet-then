import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import './Home.css';
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

import { InfoMsg } from './InfoMsg'
import { userInfo } from "os";
import LoginForm from './../../Components/Home/LoginForm';
import FindPassword from './../FindPassword/FindPassword';

interface UserInfo {
  email: string; 
  password: string;
}

interface RegisterUserInfo extends UserInfo{
  password2: string; 
  isDuplicated: boolean | null; 
}

function Home() {
  const navigate = useNavigate();

  // 회원가입용 state
  const [signUpUser, setSignUpUser] = useState<RegisterUserInfo>({email:'', password:'', password2:'', isDuplicated:null});

  // 로그인용 state
  const [user, setUser] = useState<UserInfo>({email:"", password:""});

  const[showLogin, setShowLogin] = useState<boolean>(true)
  const[showRegister, setShowRegister] = useState<boolean>(false)
  const[showFindPassword, setShowFindPassword] = useState<boolean>(false)

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
          url: "https://server.shallwemeetthen.com/members/join",
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

              Swal.fire({
                icon: "success",
                title: "회원가입 완료!",
                // text: "당신의 추억을 함께 확인하세요!",
                showConfirmButton: false,
                timer: 1300,
              });

              changeToLoginForm();
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
      url: "https://server.shallwemeetthen.com/members/join",
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
          navigate("/main", { replace: true});
        } else {
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "아이디 또는 비밀번호를 다시 확인해주세요!",
          });
        }
      })
      .catch((error) => {
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
        title: "이메일을 입력해주세요",
      });
      return
    }
    axios({
      method: 'get',
      url: "https://server.shallwemeetthen.com/members/join",
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
      .catch((err) => {
        console.log(err.message)
      })
  }

  const changeToRegisterForm = () =>{
    setShowRegister(!showRegister)

    setShowFindPassword(false)
    setShowLogin(false)
  }

  const changeToFindPasswordForm = () =>{
    setShowFindPassword(!showFindPassword)

    setShowRegister(false)
    setShowLogin(false)
  }

  const changeToLoginForm = () => {
    setShowLogin(!showLogin)

    setShowRegister(false)
    setShowFindPassword(false)
  }

  const stopEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
    <div className="landing__bg">
      {/* 회원가입 */}
      <div className="login-page">
        <div className="login-text-img">
          <img alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/logo_4.png"}
          />
          <div className="text-then-img">
            <img
              style={{ width: "128px", height: "88px" }}
              alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/then-logo.png"}
            />
          </div>
        </div>

      <ShiningLoginComponent>
        <div className="form">
          {
              showLogin === true
              ? (
                  <LoginForm 
                    stopEvent={stopEvent} 
                    user={user} setUser={setUser}
                    onSignInBtn={onSignInBtn}
                    changeToFindPasswordForm={changeToFindPasswordForm} 
                    changeToRegisterForm={changeToRegisterForm} 
                    />
              )
              :(
                <>
                </>
              )
          }
            {
              showRegister === true
              ?(
                <form className="login-form" onSubmit={stopEvent}>
                  <input
                    type="text"
                    style={{ margin: "0 0 0 0" }}
                    placeholder="email address"
                    value={signUpUser.email}
                    onChange={(e) => {
                      setSignUpUser({...signUpUser, email: e.target.value})
                    }}
                    onBlur={checkDuplicatedEmail}
                  />
                  {signUpUser.isDuplicated === null ? <></> : <InfoMsg check={signUpUser.isDuplicated} />}

                  <input
                    type="password"
                    style={{ margin: "15px 0 15px 0" }}
                    placeholder="password"
                    value={signUpUser.password}
                    onChange={(e) => {
                      setSignUpUser({...signUpUser, password: e.target.value})
                    }}
                  />
                  <input
                    type="password"
                    placeholder="password check"
                    value={signUpUser.password2}
                    onChange={(e) => {
                      setSignUpUser({...signUpUser, password2: e.target.value})
                    }}
                  />
                  <button onClick={onSignUpBtn}>create</button>
                  <p className="message">
                    아이디가 있으신가요? &nbsp;&nbsp;&nbsp;
                    <a onClick={changeToLoginForm} href="#">
                      로그인
                    </a>
                  </p>
                </form>
              )
              :(
                <></>
              )
            }
            {
               showFindPassword === true
               ? (
                   <FindPassword 
                     stopEvent={stopEvent} 
                     changeToLoginForm={changeToLoginForm}
                     changeToRegisterForm={changeToRegisterForm}
                   />
               )
               :(
                 <>
                 </>
               )            
            }

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
  height: 26rem;
  border-radius: 3rem;
  box-shadow: 0.2rem 0.2rem 1.2rem var(--pink),
    -0.2rem -0.2rem 1.2rem var(--pink);
  padding: 1rem;
  display: flex;
  margin: 12vh auto 0 auto;
`;
