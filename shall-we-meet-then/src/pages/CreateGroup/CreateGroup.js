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

import ShiningClock from "../../Components/Group/ShiningClock";

export default function CreateGroup() {
  const navigate = useNavigate()
  // 그룹 생성용 state
  const [groupName, setGroupName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [nickName, setNickName] = useState("");

  // 그룹 참가용 state
  const [invitationCode, setInvitationCode] = useState("");
  const [joinNickname, setJoinNickname] = useState("");

  //  useLocation 훅 취득
  const location = useLocation();
  const formTemp = location.state.temp;



  // 그룹생성 함수
  const callAddGroup = () => {
    console.log(`${openDate} 00:00:00`);
    if (groupName === "") {
      // alert("그룹이름을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "그룹이름을 입력해주세요.",
      });
      return;

    } else if (nickName === "") {
      // alert("사용하실 닉네임을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "사용하실 닉네임을 입력해주세요.",
      });
      return;
      
    } else if (openDate === "") {
      // alert("열람날짜를 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "시계 생성 실패",
        text: "열람날짜를 입력해주세요.",
      });

      return;
    } else {
      const context = {
        name: groupName,
        openDateTime: `${openDate} 00:00:00`,
      };
      addGroup(context)
        .then((r) => {
          console.log(r);
          setInvitationCode(r.data.invitationCode);

          const context = {
            nickname: nickName,
            invitationCode: r.data.invitationCode,
          };

          addGroupMember(context)
            .then((res) => {
              console.log("invitationCode:", invitationCode)
              console.log("생성하자마자 그룹원으로 추가에 대한 then:", res);
              
              console.log()

            });
        })
        .then(() => {
          // console.log("invitationCode:", invitationCode)
          alert("시계생성 완료! // ", invitationCode);
          
          navigate("/main")
        });
    }
  };

  // 그룹참가 함수
  const joinGroup = () => {
    if (joinNickname === "") {
      // alert("사용하실 닉네임을 입력해주세요");
      Swal.fire({
        icon: "error",
        title: "참가 실패",
        text: "사용하실 닉네임을 입력해주세요.",
      });

      return;
    } else if (invitationCode === "") {
      // alert("초대코드를 입력해주세요");
      
      Swal.fire({
        icon: "error",
        title: "참가 실패",
        text: "초대코드를 입력해주세요.",
      });

      return;
    } else {
      const context = {
        nickname: joinNickname,
        invitationCode: invitationCode,
      };
      addGroupMember(context);
    }
  };

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
    <div className="create-group-page">
      <NavBar />
      <div className="imgDiv1">
        <div className="create-clock-wrapper">

          <ShiningClock />


        </div>

        <div className="clock-info-wrapper">
          {formTemp === 1 ? (
            <>
              <h1 style={{ fontSize: "50px" }}>새로운 시계</h1>
              <div className="clock-input-wrapper">
                <p className="clock-input-group-name" htmlFor="groupName">
                  시계이름
                </p>

                <input
                  className="clock-input"
                  type="text"
                  id="groupName"
                  placeholder="그룹이름"
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
              </div>
              <div className="clock-input-wrapper">
                <p className="clock-input-nick-name" htmlFor="nickName">
                  닉네임
                </p>
                <input
                  className="clock-input"
                  type="text"
                  id="nickName"
                  placeholder="사용하실 닉네임을 입력해주세요"
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
              </div>

              <div>
                <p className="clock-input-open-date" htmlFor="openDate">
                  열람날짜
                </p>
                <input
                  type="date"
                  id="openDate"
                  value={openDate}
                  onChange={(e) => {
                    setOpenDate(e.target.value);
                  }}
                />
              </div>

              <br />

              {/* <button onClick={callAddGroup}>그룹생성</button> */}
                <div className="clock-make-btn-wrapper">
                <button 
                  className="w-btn w-btn-gra2 w-btn-gra-anim" 
                  type="button"
                  onClick={callAddGroup}
                  >
                  시계 ON
                </button>
                </div>
            </>
          ) : (
            <>
              <div>
              <h1 style={{ fontSize: "50px" }}>시계 참여하기</h1>

              
              <div className="clock-input-wrapper">
                <p className="clock-input-group-name" htmlFor="groupName">
                  참여코드
                </p>

                <input
                  className="clock-input"
                  type="text"
                  id="groupName"
                  placeholder="그룹참여코드"
                  value={invitationCode}
                  onChange={(e) => {
                    setInvitationCode(e.target.value);
                  }}
                />
              </div>

   
                <br />

                <div className="clock-input-wrapper">
                <p className="clock-input-group-name" htmlFor="groupName">
                  참여 닉네임
                </p>

                <input
                  className="clock-input"
                  type="text"
                  placeholder="닉네임"
                  value={joinNickname}
                  onChange={(e) => {
                    setJoinNickname(e.target.value);
                  }}
                />
              </div>

                <br />
                {/* <button onClick={joinGroup}>그룹참여하기</button> */}
                <div className="clock-make-btn-wrapper">
                <button 
                  className="w-btn w-btn-gra2 w-btn-gra-anim" 
                  type="button"
                  onClick={callAddGroup}
                  >
                  시계 ON
                </button>
                </div>
              </div>
            </>
          )}

          <br />
        </div>
      </div>
    </div>
  );
}