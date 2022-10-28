import React, {useState} from 'react'
import {addGroup} from '../../api/CreateGroupApi'

export default function CreateGroup() {


  const [groupName, setGroupName] = useState('');
  const [openDate, setOpenDate] = useState('');

  const callAddGroup = () => {
    console.log(`${openDate} 00:00:00`)
    if(groupName === ''){
      alert('그룹이름을 입력해주세요')
    }
    else if(openDate === ''){
      alert('열람날짜를 입력해주세요')
    }
    else{
      const context = {
        "name":groupName,
        "openDateTime":`${openDate} 00:00:00`
      }
      addGroup(context)
  }
}




  return (
    <div>
      <input type='text' placeholder='그룹이름' value={groupName}
                onChange={(e) => { setGroupName(e.target.value) }} />
      <input type='date' value={openDate}
                onChange={(e) => { setOpenDate(e.target.value) }} />
      <button onClick={callAddGroup}>그룹생성</button>
    </div>
  )
}
