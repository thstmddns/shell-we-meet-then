import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { addGroup, addGroupMember } from '../../api/CreateGroupApi'
import NavBar from "../../Components/NavBar/NavBar";
import './CreateGroup.css'

import { ShiningComponent, ShiningContainer } from "../../Components/Group/Clock";
export default function CreateGroup() {


  // 그룹 생성용 state
  const [groupName, setGroupName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [nickName, setNickName] = useState('');

  // 그룹 참가용 state
  const [invitationCode, setInvitationCode] = useState('');
  const [joinNickname, setJoinNickname] = useState('');

  //  useLocation 훅 취득
  const location = useLocation();
  const formTemp = location.state.temp

  const rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`;
  };


  useEffect(() => {
    /*  clock */
    const hours = document.querySelector(".hours");
    const minutes = document.querySelector(".minutes");
    const seconds = document.querySelector(".seconds");

    /*  play button */
    const play = document.querySelector(".play");
    const pause = document.querySelector(".pause");
    const playBtn = document.querySelector(".circle__btn");
    const wave1 = document.querySelector(".circle__back-1");
    const wave2 = document.querySelector(".circle__back-2");

    /*  rate slider */
    const container = document.querySelector(".slider__box");
    const btn = document.querySelector(".slider__btn");
    const color = document.querySelector(".slider__color");
    const tooltip = document.querySelector(".slider__tooltip");

    const clock = () => {
      let today = new Date();
      let h = (today.getHours() % 12) + today.getMinutes() / 59; // 22 % 12 = 10pm
      let m = today.getMinutes(); // 0 - 59
      let s = today.getSeconds(); // 0 - 59

      h *= 30; // 12 * 30 = 360deg
      m *= 6;
      s *= 6; // 60 * 6 = 360deg

      rotation(hours, h);
      rotation(minutes, m);
      rotation(seconds, s);

      // call every second
      setTimeout(clock, 500);
    };

    window.onload = clock();

  }, []);


  // 그룹생성 함수
  const callAddGroup = () => {
    console.log(`${openDate} 00:00:00`)
    if (groupName === '') {
      alert('그룹이름을 입력해주세요');
      return
    }
    else if (nickName === '') {
      alert('사용하실 닉네임을 입력해주세요');
      return
    }
    else if (openDate === '') {
      alert('열람날짜를 입력해주세요');
      return
    }
    else {
      const context = {
        "name": groupName,
        "openDateTime": `${openDate} 00:00:00`
      };
      addGroup(context)
        .then(r => {
          console.log(r)
          setInvitationCode(r.data.invitationCode);
          const context = {
            "nickname": nickName,
            "invitationCode": r.data.invitationCode
          };
          addGroupMember(context).then(r=>{console.log(r)})
        })
        .then(()=>{
          alert(invitationCode);
        })
    }
  }

  // 그룹참가 함수
  const joinGroup = () => {
    if (joinNickname === '') {
      alert('사용하실 닉네임을 입력해주세요');
      return
    }
    else if (invitationCode === '') {
      alert('초대코드를 입력해주세요')
      return
    }
    else {
      const context = {
        "nickname": joinNickname,
        "invitationCode": invitationCode
      };
      addGroupMember(context);
    }
  }

  return (
    <div className='create-group-page'>
      <NavBar />
      <div className='imgDiv1'>

            <div className='create-clock-wrapper'>
              <div class="clock">
                <div class="hand hours"></div>
                <div class="hand minutes"></div>
                <div class="hand seconds"></div>
                <div class="point"></div>
                <div class="marker">
                  <span class="marker__1"></span>
                  <span class="marker__2"></span>
                  <span class="marker__3"></span>
                  <span class="marker__4"></span>
                </div>
              </div>
            </div>
  
        <div className='clock-info-wrapper'>
          {formTemp === 1 ?
            <>
              <h1 style={{fontFamily:"fontone"}}>시계 만들기</h1>
              <div>
                <label htmlFor='groupName'>시계이름</label>
                <input type='text' id='groupName' placeholder='그룹이름' value={groupName}
                  onChange={(e) => { setGroupName(e.target.value) }} />
              </div>
              <br />
              <div>
                <label htmlFor='nickName'>닉네임</label>&nbsp;&nbsp;&nbsp;
                <input type='text' id='nickName' placeholder='사용하실 닉네임을 입력해주세요' value={nickName}
                  onChange={(e) => { setNickName(e.target.value) }} />
              </div>
              <br />
              <div>
                <label htmlFor='openDate'>방문 날짜</label>
                <input type='date' id='openDate' value={openDate}
                  onChange={(e) => { setOpenDate(e.target.value) }} />
              </div>
              <br />
              <button onClick={callAddGroup}>그룹생성</button>
            </>

            : <>
            <div>
            <h1>시계에 참여하기</h1>
              <input type='text' placeholder='그룹참여코드' value={invitationCode}
                onChange={(e) => { setInvitationCode(e.target.value) }} />
              <br />
              <input type='text' placeholder='닉네임' value={joinNickname}
                onChange={(e) => { setJoinNickname(e.target.value) }} />
              <br />
              <button onClick={joinGroup}>그룹참여하기</button>
              </div></>}



          <br />


        </div>
      </div>

    </div>
  )
}
