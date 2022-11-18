import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {
  getArticlesApi,
  getArticleApi,
  getVideoApi,
  getThumbnailApi,
  getImageApi,
  getArticleCount,
  getTotalArticleCount,
  getGroupDetailsApi,
  getGroupMembersApi,
  getMyInfoApi
} from '../../api/MemoryApi.js'
import GroupModal from '../Memory/GroupModal.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';
import './MemoryBtn.css'


export default function MemoryHead() {
  const { groupSeq } = useParams()
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("")
  const [groupMemberCount, setGroupMemberCount] = useState(0)
  const [totalArticleCount, setTotalArticleCount] = useState(0)
  const [myArticleCount, setMyArticleCount] = useState(0)
  const [groupMembers, setGroupMembers] = useState([])
  const [myInfo, setMyInfo] = useState([])
  const [groupModalBtn, setGroupModalBtn] = useState(0)
  useEffect(() => {
    // 그룹인원 에러!! 데이터 없음
    getGroupDetailsApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setGroupName(res.data.name)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])
  useEffect(() => {
    getTotalArticleCount(groupSeq)
      .then(res => {
        // console.log(res.data);
        if (res.data === "그룹에 작성된 게시글이 없습니다.") setTotalArticleCount(0);
        else setTotalArticleCount(res.data.totalCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [totalArticleCount])
  useEffect(() => {
    getArticleCount({groupSeq})
      .then(res => {
        // console.log(res.data);
        setMyArticleCount(res.data.articleCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [myArticleCount])
  useEffect(() => {
    getGroupMembersApi({ groupSeq })
      .then(res => {
        // console.log(res.data);
        setGroupMemberCount(res.data.length)
        setGroupMembers(res.data)
      })
      .catch(err => {
        console.error(err);
      })
    getMyInfoApi({ groupSeq })
    .then(res => {
      // console.log(res.data);
      setMyInfo(res.data)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  return (
    <>
    {
      groupModalBtn === 1
      ? <GroupModal
          groupMembers={groupMembers}
          setGroupModalBtn={setGroupModalBtn}
        />
      : null
    }
    <div className='memory-header'>
      <div className='memory-nickname-header align-center'>
        <div className='memory-nickname '>
          <h2>{groupName}</h2>
          Nickname : {myInfo.nickname}
        </div>
      </div>
      <ul className='memory-info'>
        <li className='memory-info-content'>
          <div className='memory-info-text'>
            총 게시물 <span className='bold'>
              {totalArticleCount}개</span>
          </div>
        </li>
        <li className='memory-info-content'>
          <div className='memory-info-text'>
            내 게시물 <span className='bold'>{myArticleCount}개</span>
          </div>
        </li>
        <li className='memory-info-content'>
          <div
            onClick={() => {
              setGroupModalBtn(1)
            }}
            className='memory-info-text group-member'
          >
            그룹 <span className='bold'>{groupMemberCount}명</span>
          </div>
        </li>
      </ul>
    </div>
    </>
  )
}