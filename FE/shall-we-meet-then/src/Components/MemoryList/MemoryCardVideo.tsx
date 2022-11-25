import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';

export default function MemoryCardVideo(props:any) {
  const baseURL = "http://k7d105.p.ssafy.io"
  return (
    <>
    <div className='memory-article-img'>
      <div onClick={() => {
          props.setModalBtn(1)
          props.setBoardSeq(props.boardSeq)
        }}
        className='click-memory'
      >
        <video 
          className='memory-img' width="320" height="240" 
            // src={baseURL + `/boards/${props.boardSeq}/video-download`} type="video/quicktime"></video>
            src={baseURL + `/boards/${props.boardSeq}/video-download`} ></video>
      </div>
    </div>
    </>
  )
}