import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';

export default function MemoryCard(props) {
  const baseURL = "http://k7d105.p.ssafy.io:8080"
  useEffect(() => {
    console.log(props.boardSeq);
  },[])
  return (
    <>
    <div className='memory-article-img'>
      <div onClick={() => {props.setModalBtn(1)}} className='click-memory'>
        {/* <img className='memory-img' alt="#" src={baseURL + `/boards/${props.boardSeq}/image-download`}/> */}
        <img className='memory-img' alt="#" src={process.env.PUBLIC_URL + '/assets/img/bp.jpg'}/>
      </div>
    </div>
    </>
  )
}