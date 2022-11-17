import React, { useEffect, useState, useCallback } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
// // quiz api
// import { quizApi, quizAddScoreApi } from '../../api/QuizApi.js'
import NAV from "../../Components/NavBar/NavBar"
import './Quiz.css'
import '../../Common.css'
import {
  quizApi,
  quizAddScoreApi,
} from '../../api/QuizApi.js'
import Swal from "sweetalert2";

export default function Quiz() {
  const baseURL = "http://k7d105.p.ssafy.io"
  const navigate = useNavigate()
  const [pTime, setPTime] = useState(0);
  const [problem, setProblem] = useState({})
  const [problems, setProblems] = useState([])
  const [problemIndex, setProblemIndex] = useState(0)
  const [score, setScore] = useState(0)
  const { groupSeq } = useParams()
  useEffect(() => {
    const timeout = setTimeout(() => setPTime(pTime => pTime+0.01), 10)
    if (pTime >= 10) {
      clearTimeout(timeout);

      if (problemIndex === problems.length-1) {
        console.log(score);
        quizAddScoreApi(groupSeq, score)
          .then(res => {
            // console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "퀴즈 완료!",
              text: "당신의 추억을 함께 확인하세요!",
              showConfirmButton: false,
              timer: 1300,
            });
          })
          .catch(err => {
            console.error(err);
          })
          navigate(`/group/memory/${groupSeq}`)
      }
      setPTime(0)
      setProblem(problems[problemIndex+1])
      setProblemIndex(i => i+1)
    }
  }, [pTime])
  useEffect(() => {
    quizApi({ groupSeq })
      .then(res => {
        console.log(res.data);
        setProblems(res.data)
        setProblem(res.data[problemIndex])
        if (res.data.length === 0) {
          navigate(`/group/memory/${groupSeq}`)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  function problemSolved(answer) {
    if (answer === problem.correctAnswer) {
      setScore(i => Math.round(i+100*(10-pTime)))
    }
    
    if (problemIndex === problems.length-1) {
      console.log(score);
      quizAddScoreApi(groupSeq, score)
        .then(res => {
          // console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "퀴즈 완료!",
            text: "당신의 추억을 함께 확인하세요!",
            showConfirmButton: false,
            timer: 1300,
          });
        })
        .catch(err => {
          console.error(err);
        })
        navigate(`/group/memory/${groupSeq}`)
    }
    console.log(score);
    setPTime(0)
    setProblem(problems[problemIndex+1])
    setProblemIndex(i => i+1)
  }
  const goMemoryPage = () => {
    console.log(score);
      quizAddScoreApi(groupSeq, score)
        .then(res => {
          Swal.fire({
            icon: "success",
            title: "퀴즈 Skip 완료!",
            text: "당신의 추억을 함께 확인하세요!",
            showConfirmButton: false,
            timer: 1300,
          });
        })
        .catch(err => {
          console.error(err);
        })
    navigate(`/group/memory/${groupSeq}`)
  }
  return (
    <>
    <NAV/>
    <div>
      <div className='quiz-header'>
        <div className='score quiz-user'></div>
        <div className='fmon ptop'>
          <div className='progressBar'>
            <div className='d-flex justify-between'>
              <p className='quiz-time'>{10 - Math.floor(pTime)}</p>
              <p className='quiz-score'>{problemIndex+1} / {problems.length}</p>
            </div>
            <div className='progressBar-warp-body'>
              <div className='progressBar-warp'>
                <div className='quizProgressBar'>
                  <progress id="progress" value={pTime} min="0" max="10"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-right skip-btn-loc'>
        <button onClick={goMemoryPage} className='skip-btn btn-effect'><span>skip</span></button>
      </div>
      <div className='quiz-container'>
        <div className='user_quiz_content'>
          <div className='quiz_q_content'>
            <ul className='d-flex justify-center quiz_q_content_zone'>
              <li className='overflow-y-auto quiz-question-size'>
                <p className='quiz-question'>Q{problemIndex+1}. {problem.question}</p>
              </li>
              <li className='float-right'>
                <div className='quiz-img-content'>
                  <div className='quiz-img'><img className='quiz-img' alt="#" src={baseURL + `/boards/${problem.boardSeq}/image-download`}/></div>
                </div>
              </li>
            </ul>

            <div className='quiz-answer'>
              <ul className='d-flex justify-center answer-only'>
                <li className='d-flex select-box' onClick={() => problemSolved(problem.answer1)}>
                  <span className="box-order">1</span>
                  <p>{problem.answer1}</p>
                </li>
                <li className='select-box' onClick={() => problemSolved(problem.answer2)}>
                  <span className="box-order">2</span>
                  <p>{problem.answer2}</p>
                </li>
                <li className='select-box' onClick={() => problemSolved(problem.answer3)}>
                  <span className="box-order">3</span>
                  <p>{problem.answer3}</p>
                </li>
                <li className='select-box' onClick={() => problemSolved(problem.answer4)}>
                  <span className="box-order">4</span>
                  <p>{problem.answer4}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}