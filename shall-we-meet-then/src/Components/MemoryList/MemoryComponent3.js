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
import MemoryCardVideo from './MemoryCardVideo'
import '../../Common.css';
import Piechart from '../Statistics/Piechart.js'
import Calendar from '../Statistics/Calendar.js'
import { Cdata } from '../Statistics/Cdata.js'

export default function MemoryComponent3(props) {
  const { groupSeq } = useParams()
  const [totalArticle, setTotalArticle] = useState([
    {people:'people1', totalCount:3},
    {people:'people2', totalCount:2},
    {people:'people3', totalCount:6},
    {people:'people4', totalCount:3},
    {people:'people5', totalCount:1}
  ])
  const [graphBtn, setgraphBtn] = useState(true)

  return (
    <>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
          <div>통계 페이지</div>
            
          </div>
        </div>
      </article>
    </div>
    </>
  )
}