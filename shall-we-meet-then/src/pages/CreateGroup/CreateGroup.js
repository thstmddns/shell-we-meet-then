import React, { useState } from 'react'
import { addGroup, addGroupMember } from '../../api/CreateGroupApi'
import NavBar from "../../Components/NavBar/NavBar";

export default function CreateGroup() {


  // 그룹 생성용 state
  const [groupName, setGroupName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [nickName, setNickName] = useState('');

  // 그룹 참가용 state
  const [invitationCode, setInvitationCode] = useState('');
  const [joinNickname, setJoinNickname] = useState('');

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
          const context = {
            "nickname": nickName,
            "invitationCode": r.data.invitationCode
          };
          addGroupMember(context);
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
    <div>
      <NavBar />
      <input type='text' placeholder='그룹이름' value={groupName}
        onChange={(e) => { setGroupName(e.target.value) }} />
      <input type='text' placeholder='닉네임' value={nickName}
        onChange={(e) => { setNickName(e.target.value) }} />
      <input type='date' value={openDate}
        onChange={(e) => { setOpenDate(e.target.value) }} />
      <button onClick={callAddGroup}>그룹생성</button>
      <br />
      <input type='text' placeholder='그룹참여코드' value={invitationCode}
        onChange={(e) => { setInvitationCode(e.target.value) }} />
      <input type='text' placeholder='닉네임' value={joinNickname}
        onChange={(e) => { setJoinNickname(e.target.value) }} />
      <button onClick={joinGroup}>그룹참여하기</button>
    </div>
  )
}
