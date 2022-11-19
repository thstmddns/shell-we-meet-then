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

export default function MemoryBody1({setBodyBtn, setModalBtn}: IProps) {
  return (
    <>
    <div className='memory-item-list'>
      <div
        onClick={() => {setBodyBtn(0)}}
        className='memory-item memory-item-click'>
        <div>게시글 </div>
      </div>
      <div
        onClick={() => {setBodyBtn(1)}}
        className='memory-item'>
        <div>영상 </div>
      </div>
      <div
        onClick={() => {setBodyBtn(2)}}
        className='memory-item'>
        <div>글 </div>
      </div>
    </div>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            {
              [0, 1, 2].map((a, i) => {
                return (
                  <>
                  <div className='memory-article-element'>
                    {
                      [0, 1, 2].map((b, j) => {
                        return <MemoryCard
                                setModalBtn={setModalBtn}
                               />
                      })
                    }
                  </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </article>
    </div>
    </>
  )
}