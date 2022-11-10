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


export default function MemoryComponent(props) {
  const [articleArr, setArticleArr] = useState([])
  const { groupSeq } = useParams()
  useEffect(() => {
    getArticlesApi({ groupSeq })
      .then(res => {
        const result = res.data.filter(obj => obj.hasImage);
        setArticleArr(() => chunk(result, 3))
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
                if (arr.length === 3) {
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
                } else if (arr.length === 2) {
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
                      <div style={{flex:"1 0 0%"}}></div>
                    </div>
                    </>
                  )
                } else {
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
                      <div style={{flex:"1 0 0%"}}></div>
                      <div style={{flex:"1 0 0%"}}></div>
                    </div>
                    </>
                  )
                }
              })
            }
          </div>
        </div>
      </article>
    </div>
    </>
  )
}