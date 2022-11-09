import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import '../../pages/MemoryList/MemoryList.css'
import MemoryCard from './MemoryCard'
import '../../Common.css';


export default function MemoryComponent(props) {
  const [articleArr, setArticleArr] = useState([])
  useEffect(() => {
    console.log("articles::::", props.articles)
    setArticleArr(() => chunk(props.articles, 3))
  }, [])

  function chunk(data = [], size = 1) {
    const items = [...data];
    const arr = [];
  
    while (items.length) {
      arr.push(items.splice(0, size));
    }
  
    return arr;
  }
  return (
    <>
    {/* <div className='memory-item-list'>
      <div
        onClick={() => {props.setBodyBtn(0)}}
        className='memory-item memory-item-click'>
        <div>게시글 </div>
      </div>
      <div
        onClick={() => {props.setBodyBtn(1)}}
        className='memory-item'>
        <div>영상 </div>
      </div>
      <div
        onClick={() => {props.setBodyBtn(2)}}
        className='memory-item'>
        <div>글 </div>
      </div>
    </div> */}
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            {
              articleArr.map((arr, i) => {
                return (
                  <>
                  <div className='memory-article-element'>
                    {
                      arr.map((article, j) => {
                        return <MemoryCard
                                boardSeq={article.boardSeq}
                                setModalBtn={props.setModalBtn}
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