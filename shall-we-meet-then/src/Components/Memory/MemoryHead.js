import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';
import './MemoryBtn.css'


export default function MemoryHead() {
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
            총 게시물 <span className='bold'>1,205개</span>
          </div>
        </li>
        <li className='memory-info-content'>
          <div className='memory-info-text'>
            그룹 <span className='bold'>6명</span>
          </div>
        </li>
      </ul>
    </div>
    </>
  )
}