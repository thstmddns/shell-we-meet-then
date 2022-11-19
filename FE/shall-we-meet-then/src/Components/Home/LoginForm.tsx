import React from 'react'

function LoginForm (
    props:any

    ) 
  {
    return (
      <>
          <form className="login-form" onSubmit={props.stopEvent}>
            <input
              type="text"
              placeholder="username"
              value={props.user.email}
              onChange={(e) => 
                { props.setUser({...props.user, email:e.target.value}) }}
            />
            <input
              type="password"
              placeholder="password"
              value={props.signInPassword}
              onChange={(e) => 
              { props.setUser({...props.user, password: e.target.value}) }}
            /> 
            <button onClick={props.onSignInBtn}>login</button>
            <p className="message">
              아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
              <a onClick={props.changeToRegisterForm} href="#">
                회원가입
              </a>
            </p>
            <p className="message">
              비밀번호가 기억나지 않으신가요?&nbsp;&nbsp;&nbsp;{" "}
              <a style={{ cursor: "pointer" }} onClick={props.changeToFindPasswordForm}>
                비밀번호 찾기
              </a>
            </p>
          </form>
      </>
    )
  }
export default LoginForm