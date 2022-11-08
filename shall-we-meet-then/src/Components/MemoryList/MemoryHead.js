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
} from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';
import './MemoryBtn.css'


export default function MemoryHead() {
  const { groupSeq } = useParams()
  const [groupMemberCount, setGroupMemberCount] = useState(0)
  const [totalArticleCount, setTotalArticleCount] = useState(0)
  const [myArticleCount, setMyArticleCount] = useState(0)
  useEffect(() => {
    // 그룹인원 에러!! 데이터 없음
    getGroupDetailsApi(groupSeq)
      .then(res => {
        console.log(res.data);
        setGroupMemberCount(res.data.headcount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [groupMemberCount])
  useEffect(() => {
    getTotalArticleCount({groupSeq})
      .then(res => {
        console.log(res.data);
        if (res.data === "그룹에 작성된 게시글이 없습니다.") setTotalArticleCount(0);
        else setTotalArticleCount(res.data.articleCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [totalArticleCount])
  useEffect(() => {
    getArticleCount({groupSeq})
      .then(res => {
        console.log(res.data);
        setMyArticleCount(res.data.articleCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [myArticleCount])
  return (
    <>
    <div className='memory-header'>
      <div className='memory-nickname-header align-center'>
        <div className='memory-nickname '>
          NickName
        </div>
        <div>
          <button className='w-btn w-btn-skin'>통계 보러가기</button>
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
          <div className='memory-info-text'>
            그룹 <span className='bold'>{groupMemberCount}명</span>
          </div>
        </li>
      </ul>
    </div>
    </>
  )
}