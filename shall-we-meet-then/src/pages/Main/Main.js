import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './Main.css'
import './Main.scss'
import { getGroupsApi, openApi } from '../../api/Main';


function Main() {

  const check = [
    {
      "seq": 9,
      "name": '그룹을 만들어주세요',
      "invitationCode": 'fsdjk23fm',
      "openDateTime": '2022-10-20 00:00:00',
      "headcount": 8,
      "groupMemberAgree": true
    },]

  const [groups, setGroups] = useState(check);
  const [dDay, setDDay] = useState(null);
  // 캐러셀용
  const [temp, setTemp] = useState(0);
  // 흐르는 시간 리스트
  const [flowingList, setFlowingList] = useState([]);
  // 흘러간 시간 리스트
  const [flowedList, setFlowedList] = useState([]);


  const now = new Date();
  const targetTime = new Date(groups[temp].openDateTime);



  useEffect(() => {
    setDDay(Math.ceil((now - targetTime) / (1000 * 60 * 60 * 24)))
  }, [targetTime])

  useEffect(() => {
    getGroupsApi()
      .then((r) => {
        if (r.data.length !== 0) {
          console.log(r)
          setGroups(r.data)
          const check1 = []
          const check2 = []
          for (let i = 0; i < r.data.length; i++) {
            const checkTime = new Date(r.data[i].openDateTime);
            const nowTime = new Date();

            // 흐르는시간
            if (Math.ceil((nowTime - checkTime) / (1000 * 60 * 60 * 24)) > 0) {
              check2.push(r.data[i])
            }
            // 흘러간 시간
            else {
              check1.push(r.data[i])
            }
          }
          setFlowingList(check1)
          setFlowedList(check2)
        }
      })
  }, [])




  const plusTemp = () => {
    if (temp + 1 === groups.length) {
      setTemp(0);
      return
    }
    setTemp(temp + 1);
  }

  const minusTemp = () => {
    if (temp === 0) {
      setTemp(groups.length - 1)
      return
    }
    setTemp(temp - 1)
  }



  // 지나간, 흘러간 시간 클릭시
  const selectGroup = (findSeq) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].seq === findSeq) {
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
    navigate(`/group/article/create/${groups[temp].seq}`)
  }


  const agreeOpen = () => {
    const context = {
      'groupSeq': groups[temp].seq
    }
    openApi(context).then(r=>console.log(r, groups[temp].seq))
  }




  return (
    <div>

      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='title'></div>

      <div className="nav">
        <div className="nav-header">
          <div className="nav-title">
            <a>Home</a>
          </div>
        </div>
        <div className="nav-links">
          <div className="dropdown">
            <a>흐르는 시간</a>
            <div className="dropdown-content">
              {flowingList.map((flowing, i) => (
                <div key={i}>
                  <a onClick={() => selectGroup(flowing.seq)}>{checkSize(flowing.name)}</a>
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
                  <a onClick={() => selectGroup(flowed.seq)}>{checkSize(flowed.name)}</a>
                  <br ></br>
                </div>
              ))}
            </div>
          </div>
          <a>로그아웃</a>
        </div>
      </div>
      <div>



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

          {groups[temp].name === "그룹을 만들어주세요" ? <>
            <h1 className='dDay'>그룹 추가하기</h1>
            <img className='watch' src={process.env.PUBLIC_URL + '/assets/img/watch.jpg'} />
          </> : <>
            <h1 className='dDay'>D{dDay >= 0 ? '+' : '-'}
              {dDay === 0 ? 'day' : Math.abs(dDay)}</h1>
            <img className='watch' src={process.env.PUBLIC_URL + '/assets/img/watch.jpg'} />

          </>}

        </div>
        <div className='groupName'>
          <div>
            <h1 >{groups[temp].name}</h1>{dDay !== 0 ? <button onClick={agreeOpen}>열람동의</button> : <></>}
          </div>

        </div>

      </div>


    </div>
  )
}

export default Main