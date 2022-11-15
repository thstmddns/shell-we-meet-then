import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Main.css";
import "./Main2.css";
import "./Main.scss";
import { getGroupsApi, openApi } from "../../api/Main";
import $ from "jquery";
import styled from "styled-components";
import Swal from "sweetalert2";
// import "../../App.css"

import ShiningClock from "../../Components/Group/ShiningClock";

import {
  ShiningComponent,
  ShiningContainer,
} from "../../Components/Group/ShiningComponent";

function Main() {
  const defaultGroupData = [
    {
      seq: 9,
      name: "그룹을 만들어주세요",
      invitationCode: "fsdjk23fm",
      openDateTime: "2022-10-20 00:00:00",
      headcount: 8,
      groupMemberAgree: true,
    },
  ];

  const [groups, setGroups] = useState(defaultGroupData);
  const [dDay, setDDay] = useState(null);
  // 캐러셀용
  const [temp, setTemp] = useState(0);
  // 흐르는 시간 리스트
  const [flowingList, setFlowingList] = useState([]);
  // 흘러간 시간 리스트
  const [flowedList, setFlowedList] = useState([]);

  const now = new Date();
  // const testTime = new Date(`${groups[temp].openDateTime} 00:00:00`);
  const targetTime = new Date(groups[temp].openDateTime);

  const rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`;
  };

  useEffect(() => {
    setDDay(Math.ceil((now - targetTime) / (1000 * 60 * 60 * 24)) - 1);
  }, [targetTime]);

  useEffect(() => {
    getGroupsApi().then((r) => {
      if (r.data.length !== 0) {
        console.log("그룹있음:", r.data);
        setGroups(r.data);
        const check1 = [];
        const check2 = [];
        for (let i = 0; i < r.data.length; i++) {
          const checkTime = new Date(r.data[i].openDateTime);
          const nowTime = new Date();

          // 흐르는시간
          if (Math.ceil((nowTime - checkTime) / (1000 * 60 * 60 * 24)) > 0) {
            check2.push(r.data[i]);
          }
          // 흘러간 시간
          else {
            check1.push(r.data[i]);
          }
        }
        setFlowingList(check1);
        setFlowedList(check2);
      }
    });
  }, []);

  const plusTemp = () => {
    if (temp + 1 === groups.length) {
      setTemp(0);
      return;
    }
    setTemp(temp + 1);
  };

  const minusTemp = () => {
    if (temp === 0) {
      setTemp(groups.length - 1);
      return;
    }
    setTemp(temp - 1);
  };

  // 지나간, 흘러간 시간 클릭시
  const selectGroup = (findSeq) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].seq === findSeq) {
        setTemp(i);
        break;
      }
    }
  };

  //  길이 넘으면 ...으로 보이게
  const checkSize = (name) => {
    if (name.length > 8) {
      return `${name.substr(0, 7)}...`;
    }
    return name;
  };

  const navigate = useNavigate();
  // 그룹생성
  const goCreateGroup1 = () => {
    navigate("/group/create", { state: { temp: 1 } });
  };
  // 그룹참여
  const goCreateGroup2 = () => {
    navigate("/group/create", { state: { temp: 2 } });
  };
  const goWriteBoard = () => {
    navigate(`/group/article/create/${groups[temp].seq}`);
  };

  const agreeOpen = () => {
    const context = {
      groupSeq: groups[temp].seq,
    };
    openApi(context).then((r) => {
      console.log(r, groups[temp].seq);
      Swal.fire({
        icon: "success",
        title: "열람동의가 완료되었습니다.",
        text: "퀴즈에 참여하고, 게시글을 확인해보세요!",
        showConfirmButton: false,
        timer: 1300,
      });

      // quiz로 이동: /group/quiz/:groupSeq
      navigate(`/group/quiz/${groups[temp].seq}`);
    });
  };

  const onMoveMain = () => {
    navigate("/main");
  };

  const onLogOutBtn = () => {
    sessionStorage.removeItem("accessToken");

    navigate("/");
  };

  return (
    <div className="main-page">
      <div className="navBar-wrapper">
        <div
          className="nav-home-wrapper"
          style={{ cursor: "pointer" }}
          onClick={onMoveMain}
        >
          <a>Home</a>
        </div>

        <div className="nav-time-wrapper">
          <div className="dropdown">
            <a>흐르는 시간</a>
            <div className="dropdown-nav-content">
              {flowingList.map((flowing, i) => (
                <div key={i}>
                  <a
                    className="dropdown-group-name"
                    onClick={() => selectGroup(flowing.seq)}
                  >
                    {checkSize(flowing.name)}
                  </a>
                  <br></br>
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <a>흘러간 시간</a>
            <div className="dropdown-nav-content">
              {flowedList.map((flowed, i) => (
                <div key={i}>
                  <a
                    className="dropdown-group-name"
                    onClick={() => selectGroup(flowed.seq)}
                  >
                    {checkSize(flowed.name)}
                  </a>
                  <br></br>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-logout-wrapper">
          <a className="logout-btn" onClick={onLogOutBtn}>
            로그아웃
          </a>
        </div>
      </div>
      <div className="main-content">
        {/* <button onClick={checkButton}>테스트트트트</button> */}
        {/* <h1>D-day</h1> */}

        <div className="pencil-choice">
          <div className="pencil-img">
            <hgroup class="circle bubble">
              <span class="circle__btn">
                <img
                  style={{ width: "8vw" }}
                  alt=""
                  src={
                    process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
                  }
                />
                {/* <img alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"} /> */}
              </span>
              <span class="circle__back-1"></span>
              <span class="circle__back-2"></span>
            </hgroup>
          </div>
          <div className="dropdown-content">
            <a onClick={goWriteBoard}>글쓰러가기</a>
            <br />
            <a onClick={goCreateGroup1}>그룹만들기</a>
            <br />
            <a onClick={goCreateGroup2}>그룹참여하기</a>
          </div>
        </div>
        <div className="book-choice">
          <div className="book-img">
            <hgroup class="circle bubble">
              <span class="circle__btn">
                <img
                  style={{ width: "8vw" }}
                  alt=""
                  src={
                    process.env.PUBLIC_URL + "/assets/icon-img/memory-book-img.png"
                  }
                />
                {/* <img alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"} /> */}
              </span>
              <span class="circle__back-1"></span>
              <span class="circle__back-2"></span>
            </hgroup>
          </div>
          <div className="dropdown-content">
            <a onClick={goWriteBoard}>글쓰러가기</a>
            <br />
            <a onClick={goCreateGroup1}>그룹만들기</a>
            <br />
            <a onClick={goCreateGroup2}>그룹참여하기</a>
          </div>
        </div>
        <div className="imgDiv">
          <ShiningContainer>
            <ShiningComponent>
              {groups.length === 1 ? (
                <>
                  <h1 className="dDay">그룹 추가하기</h1>
                </>
              ) : (
                <>
                  <h1 className="remain-d-day">
                    D{dDay >= 0 ? "+" : "-"}
                    {dDay === 0 ? "day" : Math.abs(dDay)}
                  </h1>
                  <div>참여코드 : {groups[temp].invitationCode}</div>
                  <div className="group-name-wrapper">
                    <h1>{groups[temp].name}</h1>
                  </div>
                  <div className="group-name-wrapper">
                    {dDay === 0 ? (
                      <>
                        <button
                          className="agree-btn"
                          style={{ backgroundColor: "red" }}
                          onClick={agreeOpen}
                        >
                          열람동의
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <ShiningClock />
                  <img
                    alt=""
                    className="downBtn"
                    src={process.env.PUBLIC_URL + "/assets/img/left.png"}
                    onClick={minusTemp}
                  />
                  <img
                    alt=""
                    className="upBtn"
                    src={process.env.PUBLIC_URL + "/assets/img/right.png"}
                    onClick={plusTemp}
                  />

                  <div className="rabbit-img-wrapper">
                    <img
                      alt=""
                      src={process.env.PUBLIC_URL + "/assets/img/rabbit.png"}
                    />
                  </div>

                  <div className="alice-img-wrapper">
                    <img
                      alt=""
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/alice-character.png"
                      }
                    />
                  </div>
                </>
              )}

              {/* <ShiningContainer>
            <ShiningComponent>
              <ShiningClock />

              <div className="rabbit-img-wrapper">
                <img alt="" src={process.env.PUBLIC_URL + "/assets/img/rabbit.png"} />
              </div>

              <div className="alice-img-wrapper">
                <img alt="" src={ process.env.PUBLIC_URL + "/assets/img/alice-character.png" } />
              </div>

            </ShiningComponent>
          </ShiningContainer> */}
            </ShiningComponent>
          </ShiningContainer>
        </div>
      </div>
    </div>
  );
}

export default Main;
