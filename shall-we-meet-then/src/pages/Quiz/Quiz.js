import React, { useEffect, useState, useCallback } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
// quiz api
import { quizApi, quizAddScoreApi } from '../../api/QuizApi.js'

export default function Quiz() {
  // dumy
  const [quizContent, setQuizContent] = useState([{img:'img1', people:'people1'}, {img:'img2', people:'people2'}, {img:'img3', people:'people3'}]);
  const [members] = useState(['people1', 'people2', 'people3', 'people4', 'people5', 'people6'])
  // variable
  const navigate = useNavigate();
  const { groupSeq } = useParams()
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizSocre] = useState(0);
  const [quizList, setQuizList] = useState([]);
  // useEffect
  useEffect(() => {
    quizApi(groupSeq)
      .then((res)=>{
        console.log(res.data)
        setQuizContent(res.data)
      })
      .catch((err)=>{
        console.error(err.data);
      })
  }, [])
  useEffect(() => {
    quizMember(quizIdx)
    console.log('next quizScore', quizScore);
  }, [quizIdx, quizScore])
  // nav-function
  const skip = () => {
    quizAddScoreApi(0)
      .then((res)=>{
        console.log(res.data)
        navigate(`/group/memory/${groupSeq}`);
      })
      .catch((err)=>{
        console.error(err.data);
      })
  };
  // function
  const nextQuiz = (problemItem) => {
    let qs = quizScore;
    if (problemItem === quizContent[quizIdx].people) {
      qs++; setQuizSocre(qs);
    }
    if (quizIdx < quizContent.length - 1) {
      setQuizIdx((quizIdx) => quizIdx+1)
    } else {
      quizAddScoreApi(qs)
        .then((res)=>{
          console.log(res.data)
          navigate(`/group/memory/${groupSeq}`);
        })
        .catch((err)=>{
          console.error(err.data);
        })
    }
  };
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
  }
  const quizMember = (idx) => {
    const qMember = new Set();
    qMember.add(quizContent[idx].people)
    while (qMember.size < 5 && qMember.size < members.length) {
      let memberIdx = Math.floor(Math.random()*members.length)
      qMember.add(members[memberIdx])
    }
    setQuizList(() => shuffle(Array.from(qMember)))
  }
  
  return (
    <>
      <div>Quiz</div>
      <button
        onClick={skip}
      >skip</button>
      <div>
        <div style={{ width:'180px', height:'240px', backgroundColor: 'gray' }}>{ quizContent[quizIdx].img }</div>
        <div>정답 : { quizContent[quizIdx].people } Score : { quizScore }</div>
        {
          quizList.map((problemItem, i) => 
            <span
              key={i}
              onClick={ () => { nextQuiz(problemItem) } }
            >{ problemItem }<br/></span>
          )
        }
      </div>
    </>
  )
}
