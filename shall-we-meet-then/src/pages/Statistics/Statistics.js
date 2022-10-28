import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Piechart from '../../Components/Statistics/Piechart.js'
import Calendar from '../../Components/Statistics/Calendar.js'
import { Cdata } from '../../Components/Statistics/Cdata.js'

export default function Statistics() {
  // dumy
  const [totalArticle, setTotalArticle] = useState([
    {people:'people1', totalCount:3},
    {people:'people2', totalCount:2},
    {people:'people3', totalCount:6},
    {people:'people4', totalCount:3},
    {people:'people5', totalCount:1}
  ])
  const [graphBtn, setgraphBtn] = useState(true)
  useEffect(() => {
    console.log(totalArticle);
  }, [])

  return (
    <>
    <div>통계 페이지</div>
    {
      graphBtn === true
      ? <Calendar
          data={Cdata}
        />
      : <Piechart
          data={[
            { id: 'cola', value: 324 },
            { id: 'cidar', value: 88 },
            { id: 'fanta', value: 221 },
            { id: 'colaa', value: 324 },
            { id: 'cidara', value: 88 },
            { id: 'fantaa', value: 221 },
        ]}
        />
    }
    <div onClick={() => setgraphBtn(graphBtn => !graphBtn)}>이전</div>
    <div onClick={() => setgraphBtn(graphBtn => !graphBtn)}>다음</div>
    </>
  )
}

