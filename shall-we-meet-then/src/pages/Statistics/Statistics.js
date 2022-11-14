import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Piechart from '../../Components/Statistics/Piechart.js'
import Calendar from '../../Components/Statistics/Calendar.js'
import LineChart from '../../Components/Statistics/LineChart.js'
import {
  getTotalArticleCountApi,
  getLastAuthorApi,
  getMostWrittenMemberApi,
  getLongestWrittenMemberApi,
  getQuizKingApi
} from '../../api/StatisticsApi.js'


export default function Statistics() {
  // dumy
  const { groupSeq } = useParams() 
  const [totalArticle, setTotalArticle] = useState([
    {people:'people1', totalCount:3},
    {people:'people2', totalCount:2},
    {people:'people3', totalCount:6},
    {people:'people4', totalCount:3},
    {people:'people5', totalCount:1}
  ])
  const [graphBtn, setgraphBtn] = useState(true)

  useEffect(() => {
    console.log(<LineChart/>);
    getTotalArticleCountApi(groupSeq)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })

    getLastAuthorApi(groupSeq)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })

    getMostWrittenMemberApi(groupSeq)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })

    getLongestWrittenMemberApi(groupSeq)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })

    getQuizKingApi(groupSeq)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })

  }, [])

  return (
    <>
    <div>통계 페이지</div>
    <LineChart/>
    {
      graphBtn === true
      ? <Calendar/>
      : <Piechart/>
    }
    <div onClick={() => setgraphBtn(graphBtn => !graphBtn)}>이전</div>
    <div onClick={() => setgraphBtn(graphBtn => !graphBtn)}>다음</div>
    </>
  )
}

