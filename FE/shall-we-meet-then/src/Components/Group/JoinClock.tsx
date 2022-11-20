import React from 'react'

const JoinClock = (props: any) => {
    return (
      <>
        <div>
        <h1 style={{ fontSize: "50px" }}>시계 참여하기</h1>
          {/* <input type='text' 
          placeholder='그룹참여코드' value={joinInfo.invitationCode}
          onChange={(e) => { setJoinInfo({...joinInfo, invitationCode: e.target.value}) }} 
        /> */}
  
              <div className="clock-input-wrapper">
                <p className="clock-input-group-name">
                  참여코드
                </p>
  
                <input
                  className="clock-input"
                  type="text"
                  id="groupName"
                  placeholder="그룹참여코드"
                  value={props.joinInfo.invitationCode}
                  onChange={(e) => {
                    props.setJoinInfo({...props.joinInfo, invitationCode: e.target.value});
                  }}
                />
              </div>
  
              <br />
  
            <div className="clock-input-wrapper">
              <p className="clock-input-group-name">
                참여 닉네임
              </p>
  
            <input
              className="clock-input"
              type="text"
              placeholder="닉네임"
              value={props.joinInfo.nickname}
              onChange={(e) => {
                props.setJoinInfo({...props.joinInfo, nickname: e.target.value});
              }}
            />
            </div>
  
            <br />
            {/* <button onClick={joinGroup}>그룹참여하기</button> */}
            <div className="clock-make-btn-wrapper">
            <button 
              className="w-btn w-btn-gra2 w-btn-gra-anim" 
              type="button"
              onClick={props.joinGroup}
              >
              시계 참여
            </button>
            </div>
            </div>
      </>
    )
  }

export default JoinClock