import React, { useEffect, useState, useCallback } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

export default function Quiz() {
  // dumy
  const [quizContent] = useState([{img:'img1', people:'people1'}, {img:'img2', people:'people2'}, {img:'img3', people:'people3'}]);
  const [members] = useState(['people1', 'people2', 'people3', 'people4', 'people5', 'people6'])
  // variable
  const navigate = useNavigate();
  const { groupSeq } = useParams()
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizSocre] = useState(0);
  const [quizList, setQuizList] = useState([]);
  // useEffect
  useEffect(() => {
    quizMember(quizIdx)
    console.log('next quizScore', quizScore);
  }, [quizIdx, quizScore])
  // nav-function
  const skip = () => {
    navigate(`/group/memory/${groupSeq}`);
  };
  const memoryListPage = () => {
    navigate(`/group/memory/${groupSeq}`);
  }; 
  // function
  const nextQuiz = (problemItem) => {
    let qs = quizScore;
    if (problemItem === quizContent[quizIdx].people) {
      qs++; setQuizSocre(qs);
    }
    console.log('증가가 되야하는데 안됩니다', qs);
    if (quizIdx < quizContent.length - 1) {
      setQuizIdx((quizIdx) => quizIdx+1)
    } else {
      console.log('End quizScore', qs);
      navigate(`/group/memory/${groupSeq}`);
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
