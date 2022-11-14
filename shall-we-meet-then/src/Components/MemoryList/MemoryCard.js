import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';

export default function MemoryCard(props) {
  const baseURL = "https://server.shallwemeetthen.com/"
  return (
    <>
    <div className='memory-article-img'>
      <div onClick={() => {
          props.setModalBtn(1)
          props.setBoardSeq(props.boardSeq)
        }}
        className='click-memory'
      >
        <img className='memory-img' alt="#" src={baseURL + `/boards/${props.boardSeq}/image-download`}/>
      </div>
    </div>
    </>
  )
}