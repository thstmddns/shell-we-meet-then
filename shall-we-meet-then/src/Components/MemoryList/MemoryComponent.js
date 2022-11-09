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
} from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import MemoryCard from './MemoryCard'
import '../../Common.css';


export default function MemoryBody1(props) {
  const [articleArr, setArticleArr] = useState([])
  const { groupSeq } = useParams()
  useEffect(() => {
    getArticlesApi({ groupSeq })
      .then(res => {
        console.log(res.data);
        setArticleArr(() => chunk(res.data, 3))
      })
      .catch(err => {
        console.error(err);
      })
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
                                setBoardSeq={props.setBoardSeq}
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