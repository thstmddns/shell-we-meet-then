import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import MemoryCard from './MemoryCard'
import '../../Common.css';


export default function MemoryBody3(props) {
  return (
    <>
    <div className='memory-item-list'>
      <div
        onClick={() => {props.setBodyBtn(0)}}
        className='memory-item'>
        <div>게시글 </div>
      </div>
      <div
        onClick={() => {props.setBodyBtn(1)}}
        className='memory-item'>
        <div>영상 </div>
      </div>
      <div
        onClick={() => {props.setBodyBtn(2)}}
        className='memory-item memory-item-click'>
        <div>글 </div>
      </div>
    </div>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            <div className='memory-article-element'>
              <MemoryCard/>
              <MemoryCard/>
              <MemoryCard/>
            </div>
            <div className='memory-article-element'>
              <MemoryCard/>
              <MemoryCard/>
              <MemoryCard/>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}