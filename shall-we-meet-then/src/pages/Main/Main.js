import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './Main.css'
import './Main.scss'
import { getGroupsApi, openApi } from '../../api/Main';
import $ from 'jquery'

function Main() {

  const test = [{
    "groupSeq": 1,
    "name": '크리스마스',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-04 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 2,
    "name": '크리스마스2',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 3,
    "name": '크리스마스3',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 4,
    "name": '크리스마스4',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 5,
    "name": '크리스마스5',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 6,
    "name": '크리스마스6',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 7,
    "name": '크리스마스7',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },
  {
    "groupSeq": 8,
    "name": '크리스마스8',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-11-28 00:00:00',
    "headcount": 8,
    "agree": true
  },

  {
    "groupSeq": 9,
    "name": '설날',
    "invitationCode": 'fsdjk23fm',
    "openDateTime": '2022-10-20 00:00:00',
    "headcount": 8,
    "agree": true
  },]

  const [groups, setGroups] = useState(test);
  const [dDay, setDDay] = useState(null);
  // 캐러셀용
  const [temp, setTemp] = useState(0);
  // 흐르는 시간 리스트
  const [flowingList, setFlowingList] = useState([]);
  // 흘러간 시간 리스트
  const [flowedList, setFlowedList] = useState([]);


  const now = new Date();
  // const testTime = new Date(`${groups[temp].openDateTime} 00:00:00`);
  const testTime = new Date(groups[temp].openDateTime);


  const checkButton = () => {
    console.log(temp)
  }

  const rotation = (target, val) => {
    target.style.transform =  `rotate(${val}deg)`;
  }


  useEffect(() => {
    /*  clock */
  const hours = document.querySelector('.hours');
  const minutes = document.querySelector('.minutes');
  const seconds = document.querySelector('.seconds');

  /*  play button */
  const play = document.querySelector('.play');
  const pause = document.querySelector('.pause');
  const playBtn = document.querySelector('.circle__btn');
  const wave1 = document.querySelector('.circle__back-1');
  const wave2 = document.querySelector('.circle__back-2');

  /*  rate slider */
  const container = document.querySelector('.slider__box');
  const btn = document.querySelector('.slider__btn');
  const color = document.querySelector('.slider__color');
  const tooltip = document.querySelector('.slider__tooltip');

  const clock = () => {
    let today = new Date();
    let h = (today.getHours() % 12) + today.getMinutes() / 59; // 22 % 12 = 10pm
    let m = today.getMinutes(); // 0 - 59
    let s = today.getSeconds(); // 0 - 59

    h *= 30; // 12 * 30 = 360deg
    m *= 6;
    s *= 6; // 60 * 6 = 360deg

    // rotation = (target, val) => {
    //   target.style.transform =  `rotate(${val}deg)`;
    // }

    rotation(hours, h);
    rotation(minutes, m);
    rotation(seconds, s);

    // call every second
    setTimeout(clock, 500);
  }



  window.onload = clock();

  setDDay(Math.ceil((now - testTime) / (1000 * 60 * 60 * 24)))
}, [testTime])

  useEffect(() => {
    const check1 = []
    const check2 = []
    for (let i = 0; i < groups.length; i++) {
      const checkTime = new Date(groups[i].openDateTime);
      const nowTime = new Date();

      // 흐르는시간
      if (Math.ceil((nowTime - checkTime) / (1000 * 60 * 60 * 24)) > 0) {
        check1.push(groups[i])
      }
      // 흘러간 시간
      else {
        check2.push(groups[i])
      }
    }
    setFlowingList(check1)
    setFlowedList(check2)
  }, [])

  useEffect(()=>{
    getGroupsApi()
    .then(r => {
      // setGroups(r.data)
      console.log(r)
    })
  },[])


  const plusTemp = () => {
    if (temp + 1 === groups.length) {
      setTemp(0);
      return
    }
    setTemp(temp + 1);
  }

  const minusTemp = () => {
    if (temp === 0) {
      setTemp(groups.length-1)
      return
    }
    setTemp(temp - 1)
  }



  // 지나간, 흘러간 시간 클릭시
  const selectGroup = (findSeq) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].groupSeq === findSeq) {
        setTemp(i)
        break
      }
    }
  }

  //  길이 넘으면 ...으로 보이게
  const checkSize = (name) => {
    if (name.length > 6) {
      return `${name.substr(0, 5)}...`
    }
    return name
  }

  const navigate = useNavigate();
  // 그룹생성
  const goCreateGroup1 = () => {
    navigate("/group/create", { state: { 'temp': 1 } });
  }
  // 그룹참여
  const goCreateGroup2 = () => {
    navigate("/group/create", { state: { 'temp': 2 } });
  }
  const goWriteBoard = () => {
    navigate(`/group/article/create/${groups[temp].groupSeq}`)
  }


  const agreeOpen = () => {
    const context = {
      'groupSeq':groups[temp].groupSeq
    }
    openApi(context)
  }




  return (
    <div className='main-page'>

      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='title'></div>

      <div className="nav">
        <div className="nav-header" >
          <div className="nav-title" >
            <a>Home</a>
          </div>
        </div>
        <div className="nav-links" >
          <div className="dropdown">
            <a>흐르는 시간</a>
            <div className="dropdown-content">
              {flowingList.map((flowing, i) => (
                <div key={i}>
                  <a onClick={() => selectGroup(flowing.groupSeq)}>{flowing.name}</a>
                  <br></br>
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <a>흘러간 시간</a>
            <div className="dropdown-content">
              {flowedList.map((flowed, i) => (
                <div key={i}>
                  <a onClick={() => selectGroup(flowed.groupSeq)}>{checkSize(flowed.name)}</a>
                  <br ></br>
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <a className='logout-btn'>로그아웃</a>
          </div>
        </div>
      </div>
      <div style={{marginTop:"-20vh"}}>

        {/* <button onClick={checkButton}>테스트트트트</button> */}
        {/* <h1>D-day</h1> */}

        <div className='pencilDiv'>
          <div className="dropdown">
            <img src={process.env.PUBLIC_URL + '/assets/img/pencil.png'} />
            <div className='dropdown-content'>
              <a onClick={goWriteBoard}>글쓰러가기</a>
              <br />
              <a onClick={goCreateGroup1}>그룹만들기</a>
              <br />
              <a onClick={goCreateGroup2}>그룹참여하기</a>
            </div>
          </div>
        </div>

        <img className='downBtn' src={process.env.PUBLIC_URL + '/assets/img/left.png'} onClick={minusTemp} />
        <img className='upBtn' src={process.env.PUBLIC_URL + '/assets/img/right.png'} onClick={plusTemp} />


        <div className='imgDiv'>
          <h1 className='dDay'>D{dDay >= 0 ? '-' : '+'}
            {dDay === 0 ? 'day' : Math.abs(dDay)}</h1>
          {/* <img className='watch' src={process.env.PUBLIC_URL + '/assets/img/watch.png'} /> */}
        
        <div class="container">
          <div class="components">
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
        </div>


          
        </div>
        {/* <div > */}
          <div className='group-name-wrapper'>
            <h1 >{groups[temp].name}</h1>{dDay === 0 ? <button>열람동의</button> : <></>}
          </div>
        {/* </div> */}
      </div>

    </div>
  )
}

export default Main