import React from 'react'

function LoginForm (
    {stopEvent, signInEmail, setSignInEmail, changeToFindPasswordForm, 
    signInPassword, setSignInPassword, signIn, changeToRegisterForm,
}) {
    return (
      <>
          <form className="login-form" onSubmit={stopEvent}>
            <input
              type="text"
              placeholder="username"
              value={signInEmail}
              onChange={(e) => {
                setSignInEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={signInPassword}
              onChange={(e) => {
                setSignInPassword(e.target.value);
              }}
            /> 
            <button onClick={signIn}>login</button>
            <p className="message">
              아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
              <a onClick={changeToRegisterForm} href="#">
                회원가입
              </a>
            </p>
            <p className="message">
              비밀번호가 기억나지 않으신가요?&nbsp;&nbsp;&nbsp;{" "}
              <a style={{ cursor: "pointer" }} onClick={changeToFindPasswordForm}>
                비밀번호 찾기
              </a>
            </p>
          </form>
      </>
    )
  }
export default LoginForm