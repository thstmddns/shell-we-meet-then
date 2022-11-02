import React, { useEffect, useState, useCallback } from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from "react-router-dom";
// // quiz api
// import { quizApi, quizAddScoreApi } from '../../api/QuizApi.js'
import NAV from "../../Components/NavBar/NavBar"
import './Quiz.css'
import '../../Common.css'

export default function Quiz() {
  const [pTime, setPTime] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setPTime(pTime => pTime+0.01), 10)
    if (pTime >= 10) clearTimeout(timeout);
  }, [pTime])
  return (
    <>
    <NAV/>
    <div className='quiz-header'>
      <div className='score quiz-user'></div>
      <div className='fmon ptop'>
        <div className='progressBar'>
          <div className='d-flex justify-between'>
            <p className='quiz-time'>{10 - Math.floor(pTime)}</p>
            <p className='quiz-score'>1/5</p>
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
      <button className='skip-btn btn-effect'><span>skip</span></button>
    </div>
    <div className='quiz-container'>
      <div className='user_quiz_content'>
        <div className='quiz_q_content'>
          <ul className='d-flex justify-center quiz_q_content_zone'>
            <li className='overflow-y-auto quiz-question-size'>
              <p className='quiz-question'>Q2. 이 글의 작성자는 누구일까요? 마하반야바라밀다심경 절에 들어가는 이유는 절을 그리워서가 아니고 속세에서 벗어나기 위함이다</p>
            </li>
            <li className='float-right'>
              <div className='quiz-img-content'>
                <div className='quiz-img'><img className='quiz-img' alt="#" src={process.env.PUBLIC_URL + '/assets/img/bp.jpg'}/></div>
              </div>
            </li>
          </ul>

          <div className='quiz-answer'>
            <ul className='d-flex justify-center answer-only'>
              <li className='d-flex select-box'>
                <span className="box-order">1</span>
                <p>Quiz-A-1</p>
              </li>
              <li className='select-box'>
                <span className="box-order">2</span>
                <p>Quiz-A-2</p>
              </li>
              <li className='select-box'>
                <span className="box-order">3</span>
                <p>Quiz-A-3</p>
              </li>
              <li className='select-box'>
                <span className="box-order">4</span>
                <p>Quiz-A-4</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
    </>
  )
}