import React from 'react'

const MakeClock  = (props: any) => {
    return (
      <>
            <h1 style={{ fontSize: "50px" }}>새로운 시계</h1>


              <div className="clock-input-wrapper">
                <p className="clock-input-group-name">
                  시계이름
                </p>
                <input 
                  className="clock-input"
                  type='text' 
                  id="groupName"
                  placeholder='그룹이름' 
                  value={props.groupInfo.name}
                  // onChange={onChangeGroupName }
                  onChange={(e) => { props.setGroupInfo({...props.groupInfo, name: e.target.value}) }}  
                />
              </div>

              <div className="clock-input-wrapper">
                <p className="clock-input-nick-name">
                  닉네임
                </p>
                <input 
                  className="clock-input"
                  type='text' 
                  id='nickName' 
                  placeholder='사용하실 닉네임을 입력해주세요' 
                  value={props.joinInfo.nickname}
                  onChange={(e) => { 
                    props.setJoinInfo({...props.joinInfo, nickname: e.target.value}) 
                  }}  
                />
              </div>

              <div>
                <p className="clock-input-open-date">
                  열람날짜
                </p>
                <input 
                  type='date' 
                  id='openDateTime' 
                  value={props.groupInfo.openDateTime}
                  onChange={(e) => { props.setGroupInfo({...props.groupInfo, openDateTime: e.target.value}) }} 
                  />
              </div>

              <br />

              <div className="clock-make-btn-wrapper">
                <button 
                  className="w-btn w-btn-gra2 w-btn-gra-anim" 
                  type="button"
                  onClick={props.callAddGroup}
                  >
                  시계 ON
                </button>
                </div>
      </>
    )
  }

export default MakeClock