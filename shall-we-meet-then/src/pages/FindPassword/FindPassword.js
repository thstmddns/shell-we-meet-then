import React, {  useState } from "react";
import './FindPassword.css'
import { findPasswordApi } from "../../api/FindPasswordApi";



function FindPassword() {
    const [Email, setEmail] = useState('');



    const sendEmail = () => {

        const context = {
            email:Email
        }
        
        findPasswordApi(context)
        .then(res => {
            console.log(res)
            if(res.status === 200){
                alert('비밀번호 수정 이메일이 전송되었습니다.')
            }
            else{
                alert('없는 아이디입니다')
            }
        })
    }




  return (
    <div >
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type="text" placeholder="E-mail" value={Email}
            onChange={(e) => { setEmail(e.target.value)}}/>
            <button onClick={sendEmail}>비밀번호 찾기</button>
          </div>
        </div>
      </div>




    </div>
  )
}

export default FindPassword
