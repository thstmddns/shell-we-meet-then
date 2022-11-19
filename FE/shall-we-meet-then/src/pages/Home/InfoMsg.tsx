import React, { useEffect } from 'react'

// interface IProp {
//     check: boolean;
//   }

export const InfoMsg = (props:any) => {
    return (
      <div>
      {
        props.check 
          ? (
            <p
            className="message"
            style={{ color: "red", margin: "0 0 0 0", textAlign: "left" }}
          >
            {" "}
            이미 사용중인 이메일입니다.
          </p>
          )
          : (
            <p
            className="message"
            style={{ color: "green", margin: "0 0 0 0", textAlign: "left" }}
          >
            사용가능한 이메일입니다.
          </p>
          )
      }
    </div>
    )
  }

  // export default InfoMsg;