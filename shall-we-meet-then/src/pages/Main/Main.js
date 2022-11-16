import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Main.css";
import "./Main2.css";
import "./Main.scss";
import { getGroupsApi, openApi } from "../../api/Main";

import Swal from "sweetalert2";
import ShiningClock from "../../Components/Group/ShiningClock";
import { ShiningComponent,ShiningContainer } from "../../Components/Group/ShiningComponent";

import { WritePencilBtn, NewClockBtn, MemoryBook } from "../../Components/Main/MainComponent";

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

  const [temp, setTemp] = useState(0);   // 캐러셀용
  const [flowingList, setFlowingList] = useState([]);  // 흐르는 시간 리스트
  const [flowedList, setFlowedList] = useState([]);   // 흘러간 시간 리스트
  
  const navigate = useNavigate();
  const now = new Date();
  const targetTime = new Date(groups[temp].openDateTime);

  const [agreeState, setAgreeState] = useState(false)

  useEffect(() => {
    setDDay(Math.ceil((now - targetTime) / (1000 * 60 * 60 * 24)) - 1);
  }, [targetTime]);

  useEffect(() => {
    getGroupsApi().then((r) => {
      if (r.data.length !== 0) {
       
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
  const checkGroupNameLength = (name) => {
    if (name.length > 8) {
      return `${name.substr(0, 7)}...`;
    }
    return name;
  };


  // 그룹생성
  const createNewClock = () => {
    navigate("/group/create", { state: { temp: 1 } });
  };
  // 그룹참여
  const joinNewClock = () => {
    navigate("/group/create", { state: { temp: 2 } });
  };

  const goWriteBoard = (e) => {
    console.log("gogoog")
    navigate(`/group/article/create/${groups[temp].seq}`);
  };


  const agreeOpen = () => {
    setAgreeState(true)

    openApi(groups[temp].seq)
      .then((r) => {

      Swal.fire({
        icon: "success",
        title: "열람동의가 완료되었습니다.",
        text: "퀴즈에 참여하고, 게시글을 확인해보세요!",
        showConfirmButton: false,
        timer: 1300,
      });

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

  const goMemoryList = function () {
    navigate(`/group/memory/${groups[temp].seq}`)
  }


  return (
    <div className="main-page">
      <div className="navBar-wrapper">
        <div
          className="nav-home-wrapper"
          style={{ cursor: "pointer" }}
          onClick={onMoveMain}
        >
          <div>Home</div>
        </div>

        <div className="nav-time-wrapper">
          <div className="dropdown">
            <div>흐르는 시간</div>
            <div className="dropdown-nav-content">
              {flowingList.map((flowing, i) => (
                <div key={i}>
                  <div
                    className="dropdown-group-name"
                    onClick={() => selectGroup(flowing.seq)}
                  >
                    {checkGroupNameLength(flowing.name)}
                  </div>
                  <br></br>
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <div>흘러간 시간</div>
            <div className="dropdown-nav-content">
              {flowedList.map((flowed, i) => (
                <div key={i}>
                  <div
                    className="dropdown-group-name"
                    onClick={() => selectGroup(flowed.seq)}
                  >
                    {checkGroupNameLength(flowed.name)}
                  </div>
                  <br></br>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-logout-wrapper">
          <div className="logout-btn" onClick={onLogOutBtn}>
            로그아웃
          </div>
        </div>
      </div>
      <div className="main-content">

        <div className="imgDiv">
          <ShiningContainer>
            <ShiningComponent>
            {
              groups.length === 1 
              ? 
              (
                <>
                  <h1 className="dDay">새로운 시계를 만들어주세요!</h1>
                  <div className="zero-base-clock">
                    <NewClockBtn></NewClockBtn>
                  </div>
                </>
              ) 
              : 
              (
                <>
                  <ShiningClock></ShiningClock>
                  <div className="new-base-clock">
                    <NewClockBtn 
                      createNewClock={createNewClock} joinNewClock={joinNewClock}>
                    </NewClockBtn>
                  </div>
                  <div className="group-name-wrapper">
                    <h1>{groups[temp].name}</h1>
                  </div>

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
                  <div>
                  {
                    dDay < 0 // D Day가 아직 남은 경우 
                    ? (
                      <>
                        <h1 className="remain-d-day">
                          D - {Math.abs(dDay)}
                        </h1>
                        <WritePencilBtn goWriteBoard={goWriteBoard} />
                      </>
                    )
                    : (
                      <>
                      {
                        dDay === 0 // D Day 당일인 경우 
                        ? (
                           // 열람동의 여부에 대해서
                          <>
                          <h1 className="remain-d-day">
                            D + Day
                          </h1>
                          {
                            agreeState === false
                            ?(
                              <>
                              <button className="agree-btn"
                                style={{ backgroundColor: "red" }}
                                onClick={agreeOpen}
                              > 열람동의 </button>
                              </>
                            )
                            :(
                              <>  
                                <MemoryBook goMemoryList={goMemoryList}></MemoryBook>
                              </>
                            )
                          }
                          </>
                        )
                        : (  // D Day 가 이미 지나간 경우 
                          <>
                            <h1 className="remain-d-day">
                              D + {Math.abs(dDay)}
                            </h1>
                            <MemoryBook goMemoryList={goMemoryList}></MemoryBook>
                          </>
                        )
                      }
                      </>
                    ) 
                    }
                  </div>

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
                )
              }
            </ShiningComponent>
          </ShiningContainer>
        </div>
      </div>
    </div>

  );
}

export default Main;
