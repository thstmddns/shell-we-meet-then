import React, { useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import Swal from "sweetalert2";

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
        url: 'http://k7d105.p.ssafy.io/members/password',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email:email,
          nextPassword: password,
          uuid:uuid
        },
      })
      .then((res)=>{
        console.log(res.data)

      Swal.fire({
        icon: "success",
        title: "비밀번호 수정 완료!",
        showConfirmButton: false,
        timer: 1300,
      });
        
        navigate('/')
      })
      .catch((err)=>{
        console.log(err.message)
      })

    }
    else {
      alert('비밀번호가 다릅니다.')
    }
  }

  const stopEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <div className="landing__bg">
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
          <form className="register-form" onSubmit={stopEvent}>
            <input 
              type='password' 
              placeholder="new_password" value={password}
              onChange={(e) => { setPassword(e.target.value) }} 
            />
            <input type='password' placeholder="check_password" value={passwordCheck}
              onChange={(e) => { setPasswordCheck(e.target.value) }} />
            <button onClick={passwordUpdate}>비밀번호 수정</button>
          </form>
        </div>
      </ShiningLoginComponent>
      </div>
    </div>
  )
}

export default NewPassword

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
