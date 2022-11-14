import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {
  quizGetScoreApi,
} from '../../api/QuizApi.js'
import {
  getArticleCount,
  getTotalUserArticleCountApi,
  getGroupArticleCountApi 
} from '../../api/MemoryApi.js'
import {
  getTotalArticleCountApi,
  getLastAuthorApi,
  getMostWrittenMemberApi,
  getLongestWrittenMemberApi,
  getQuizKingApi
} from '../../api/StatisticsApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css'
import MemoryCard from './MemoryCard'
import MemoryCardVideo from './MemoryCardVideo'
import Piechart from '../Statistics/Piechart.js'
import Calendar from '../Statistics/Calendar.js'
import LineChart from '../Statistics/LineChart.js'
import { Cdata } from '../Statistics/Cdata.js'

export default function MemoryComponent3(props) {
  const { groupSeq } = useParams()
  const [score, setScore] = useState(0)
  const [graphBtn, setgraphBtn] = useState(true)
  const [totalArticle, setTotalArticle] = useState(0)
  const [lastArticle, setLastArticle] = useState('')
  const [manyArticle, setManyArticle] = useState('')
  const [longArticle, setLongArticle] = useState('')
  const [manyQuiz, setManyQuiz] = useState('')
  const [myArticleCount, setMyArticleCount] = useState(0)
  useEffect(() => {
    getArticleCount({groupSeq})
      .then(res => {
        // console.log(res.data);
        setMyArticleCount(res.data.articleCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [myArticleCount])
  useEffect(() => {
    quizGetScoreApi({groupSeq})
      .then(res => {
        // console.log(res.data);
        setScore(res.data.score)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])
  useEffect(() => {
    getTotalArticleCountApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setTotalArticle(res.data.totalCount)
      })
      .catch(err => {
        console.error(err)
      })

    getLastAuthorApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setLastArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getMostWrittenMemberApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setManyArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getLongestWrittenMemberApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setLongArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getQuizKingApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setManyQuiz(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

  }, [])

  return (
    <>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            <div className='statistics-main'>
              <div className='d-flex'>
                {/* groupbox */}
                <div className='statistics-box'>
                  <div className='statistics-box-content'>
                    <h3>groupname State</h3>
                    <div className='statistics-problem'>
                      <div>총 게시물 : </div>
                      <div>글을 가장 마지막에 작성한 맴버 : </div>
                      <div>글을 가장 많이 작성한 맴버 : </div>
                      <div>글을 가장 길게 작성한 맴버 : </div>
                      <div>문제를 가장 많이 맞춘 맴버 : </div>
                    </div>
                    <div className='statistics-question'>
                      <div>{totalArticle}개 </div>
                      <div>{lastArticle}</div>
                      <div>{manyArticle}</div>
                      <div>{longArticle}</div>
                      <div>{manyQuiz}</div>
                    </div>
                    <div className='statistics-score'>
                      <div className='statistics-score-head'>My score</div>
                      <div className='statistics-score-content'>{score}</div>
                    </div>
                  </div>
                </div>
                {/* LineChart */}
                <LineChart/>
              </div>
              {/* Calendar */}
              <div className='statistics-calendar-box'>
                <div className='calendar-text'>{myArticleCount} contributions in the last year</div>
                <Calendar/>
              </div>
              <div className='statistics-pichar-box'>
                <div className='piechat-text'>총 게시글 비율</div>
                <Piechart/>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}