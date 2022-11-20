import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi'
import '../../pages/MemoryList/MemoryList.css'
import MemoryCard from './MemoryCard'
import '../../Common.css';

interface IProps  {
  setBodyBtn: React.Dispatch<React.SetStateAction<number>>;
  setModalBtn: React.Dispatch<React.SetStateAction<number>>;
}


export default function MemoryBody3({setBodyBtn, setModalBtn}: IProps) {
  return (
    <>
    <div className='memory-item-list'>
      <div
        onClick={() => {setBodyBtn(0)}}
        className='memory-item'>
        <div>게시글 </div>
      </div>
      <div
        onClick={() => {setBodyBtn(1)}}
        className='memory-item'>
        <div>영상 </div>
      </div>
      <div
        onClick={() => {setBodyBtn(2)}}
        className='memory-item memory-item-click'>
        <div>글 </div>
      </div>
    </div>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            <div className='memory-article-element'>
              <MemoryCard setModalBtn={setModalBtn}/>
              <MemoryCard setModalBtn={setModalBtn}/>
              <MemoryCard setModalBtn={setModalBtn}/>
            </div>
            <div className='memory-article-element'>
              <MemoryCard setModalBtn={setModalBtn}/>
              <MemoryCard setModalBtn={setModalBtn}/>
              <MemoryCard setModalBtn={setModalBtn}/>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}