import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addGroup, addGroupMember } from "../../api/CreateGroupApi";
import NavBar from "../../Components/NavBar/NavBar";
import "./CreateGroup.css";

import styled from "styled-components";
import Swal from "sweetalert2";
import {
  ShiningComponent,
  ShiningContainer,
} from "../../Components/Group/ShiningComponent";

import ShiningClock from "../../Components/Group/ShiningClock.js";
import JoinClock from "../../Components/Group/JoinClock";
import MakeClock from "../../Components/Group/MakeClock";

export interface GroupInfo {
  name: string;
  openDateTime: string;
  // nickName: string;
}

export interface JoinInfo {
  nickname: string;  
  invitationCode: string; 
}

export default function CreateGroup() {
  const navigate = useNavigate()

  // 그룹 생성용 state
  const [groupInfo, setGroupInfo] = useState<GroupInfo>({name:'', openDateTime:''});

  // 그룹 참가용 state
  const [joinInfo, setJoinInfo] = useState<JoinInfo>({invitationCode:'', nickname:''});

  //  useLocation 훅 취득
  const location = useLocation();
  const formTemp = location.state.temp


  // 그룹생성 함수
  const callAddGroup = () => {
    console.log(`${groupInfo.openDateTime} 00:00:00`)

    if (groupInfo.name === '') {
      // alert("그룹이름을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "그룹이름을 입력해주세요.",
      });
      return
    }
    else if (joinInfo.nickname === '') {
      // alert("사용하실 닉네임을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "사용하실 닉네임을 입력해주세요.",
      });
      return
    }
    else if (groupInfo.openDateTime === '') {
      // alert("열람날짜를 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "열람날짜를 입력해주세요.",
      });

      return
    }
    else {
      const addGroupInfo:GroupInfo = {
        "name": groupInfo.name,
        "openDateTime": `${groupInfo.openDateTime} 00:00:00`
      };

      addGroup(addGroupInfo)
        .then((res) => {
          console.log("addGroup호출 후:", res.data);
          setJoinInfo({...joinInfo, invitationCode: res.data.invitationCode});
          let inviCode = res.data.invitationCode;

          const addGroupMemberInfo = {
            "nickname": joinInfo.nickname,
            "invitationCode": res.data.invitationCode
            // "invitationCode": r.data.invitationCode
          };
          addGroupMember(addGroupMemberInfo)
            .then((res)=>{
              console.log("invitationCode:", inviCode)
              console.log("생성하자마자 그룹원으로 추가에 대한 then:", res);
              console.log("***********************:", inviCode)

              Swal.fire({
                title: '초대코드로 친구들을 초대하세요! ',
                text: `${inviCode}`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })

              navigate("/main")

            })
        })
    }
  }

  // 그룹참가 함수
  const joinGroup = () => {
    if (joinInfo.nickname === '') {
      // alert("사용하실 닉네임을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "참가 실패",
        text: "사용하실 닉네임을 입력해주세요.",
      });

      return
    }
    else if (joinInfo.invitationCode === '') {
      // alert("초대코드를 입력해주세요");
      
      Swal.fire({
        icon: "error",
        title: "참가 실패",
        text: "초대코드를 입력해주세요.",
      });
      return
    }
    else {
      const context = {
        "nickname": joinInfo.nickname,
        "invitationCode": joinInfo.invitationCode
      };
      addGroupMember(context)
      .then((res)=>{
        Swal.fire({
          icon: "success",
          title: "참여가 완료되었습니다!",
          showConfirmButton: false,
          timer: 1300,
        });

        navigate("/main")
      })
      .catch((err)=>{
        console.log(err.message);
      });
    }
  }

  const onChangeGroupName = (e:React.ChangeEvent<HTMLInputElement> )=>{
    e.preventDefault(); 
    setGroupInfo({...groupInfo, name: e.target.value})

  }

  const ShiningInput = styled.div`
    width: 20vw;
    height: 5vh;
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

    margin-top: 3vh;
    margin-bottom: 3vh;
  `;


  return (
    <div>
      <NavBar />
      <div className='imgDiv1'>

      <div className="create-clock-wrapper">
          <div className="clock">
            <div className="hand hours"></div>
            <div className="hand minutes"></div>
            <div className="hand seconds"></div>
            <div className="point"></div>
            <div className="marker">
              <span className="marker__1"></span>
              <span className="marker__2"></span>
              <span className="marker__3"></span>
              <span className="marker__4"></span>
            </div>
          </div>
        </div>

        <div className="clock-info-wrapper">

        {
          formTemp === 1 
          ? 
          (
            <MakeClock 
              groupInfo={groupInfo} setGroupInfo={setGroupInfo}  
              joinInfo={joinInfo} setJoinInfo={setJoinInfo}
              callAddGroup={callAddGroup}
            />
          )
          : 
          (
            <JoinClock 
              joinInfo={joinInfo} setJoinInfo={setJoinInfo}
              joinGroup={joinGroup}  
            />
          )
        }
          <br />
        </div>
    </div>
    </div>
  )
}