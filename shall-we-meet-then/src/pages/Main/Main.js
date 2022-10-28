import React, {useState,useEffect} from 'react'
import { useNavigate } from  "react-router-dom";
import './Main.css'
import { getGroupsApi } from '../../api/Main';


function Main() {

  const test = [{
		"groupSeq":1,
		"name":'크리스마스',
		"invitationCode":'fsdjk23fm',
		"openDateTime":'2022-10-28 00:00:00',
		"headcount":8,
		"agree":true
	},
  {
		"groupSeq":2,
		"name":'설날',
		"invitationCode":'fsdjk23fm',
		"openDateTime":'2022-10-20 00:00:00',
		"headcount":8,
		"agree":true
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


    useEffect(()=>{
      setDDay(Math.ceil((now-testTime) / (1000 * 60 * 60 * 24)))
    },[testTime])

    useEffect(()=> {
      const check1 = []
      const check2 = []
      // console.log(groups.length)
      for(let i = 0; i < groups.length; i++){
        const checkTime = new Date(groups[i].openDateTime);
        const nowTime =  new Date();
        
        // 흐르는시간
        if(Math.ceil((nowTime-checkTime) / (1000 * 60 * 60 * 24)) > 0){
          check1.push(groups[i])
        }
        // 흘러간 시간
        else{
          check2.push(groups[i])
        }
      }
      setFlowingList(check1)
      setFlowedList(check2)
    },[])




    // useEffect(()=>{
    //   getGroupsApi().then(r => setGroups(r.data))
    // },[])

    const plusTemp = () => {
      if (temp + 1 === groups.length){
        return
      }
      setTemp(temp+1);
    }

    const minusTemp = () => {
      if (temp === 0 ){
        return
      }
      setTemp(temp-1)
    }


    const navigate = useNavigate();
    const goCreateGroup = () => {
      navigate("/group/create");
    }
    const goWriteBoard = () => {
      navigate(`/group/article/create/${groups[temp].groupSeq}`)
    }


    


  return (
    <div>
      <div>
        <button onClick={checkButton}>테스트트트트</button>
        <h1>D-day</h1>
        <h1>D{dDay >= 0 ? '-' : '+'}
            {dDay === 0 ? 'day' : Math.abs(dDay)}</h1>
        <button onClick={minusTemp}> down </button>
        <button onClick={plusTemp}> up </button>
        <br />
        <button onClick={goWriteBoard}>글 쓰러가기</button>
        <button onClick={goCreateGroup}>그룹만들기 및 창여하기</button>

      </div>


    </div>
  )
}

export default Main