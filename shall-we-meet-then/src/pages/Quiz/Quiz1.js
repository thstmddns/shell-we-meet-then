import React, { useEffect, useState, useCallback } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
// quiz api
import { quizApi, quizAddScoreApi } from '../../api/QuizApi.js'
import './Quiz.css'
import '../../Common.css'

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
    quizAddScoreApi(quizScore)
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
      <div>정답 : { quizContent[quizIdx].people } Score : { quizScore }</div>
      <div>
        <div className='quiz-head'><img className='quiz-head-img' alt="#" src={process.env.PUBLIC_URL + '/assets/img/quiz.png'}/></div>
        <div className='d-flex align-center justify-center'>
          <div className='d-flex column align-center'>
            <div><img className='quiz-img' alt="#" src={process.env.PUBLIC_URL + '/assets/img/bp.jpg'}/></div>
          </div>
          <div className='d-flex column justify-center'>
            {
              quizIdx === 0
              ? <FirstQuiz
                  quizIdx={quizIdx}
                  quizList={quizList}
                  nextQuiz={nextQuiz}
                />
              : <SecondQuiz
                  quizIdx={quizIdx}
                  quizList={quizList}
                  nextQuiz={nextQuiz}
                />
            }
          </div>
        </div>
      </div>
      <div className='btn-right'><button className='skip-btn btn-effect' onClick={skip}><span>skip</span></button></div>
    </>
  )
}

function FirstQuiz(props) {
  return (
    <>
    <div className='quiz-question'>Q{props.quizIdx+1}. 가장 많은 글을 쓴 사람은 누구일까요?</div>
    {
      props.quizList.map((problemItem, i) => 
        <div
          className='quiz-content'
          key={i}
          onClick={ () => { props.nextQuiz(problemItem) } }
        >{i+1}. { problemItem }<br/></div>
      )
    }
    </>
  )
}

function SecondQuiz(props) {
  return (
    <>
    <div className='quiz-question'>Q{props.quizIdx+1}. 다음 사진의 주인공은 누구일까요?</div>
    {
      props.quizList.map((problemItem, i) => 
        <div
          className='quiz-content'
          key={i}
          onClick={ () => { props.nextQuiz(problemItem) } }
        >{i+1}. { problemItem }<br/></div>
      )
    }
    </>
  )
}