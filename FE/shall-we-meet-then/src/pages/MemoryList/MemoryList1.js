import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi'
import { bList } from './test.js'
import './MemoryList.css';
import './Modal.css'

export default function MemoryList() {
  // dumy
  // variable
  const navigate = useNavigate();
  const { groupSeq } = useParams()
  const [boardsList, setBoardsList] = useState([])
  const [boardIdx, setboardIdx] = useState(0)
  const [lookList, setLookList] = useState(0)
  const [modalBtn, setModalBtn] = useState(0)
  // useEffect
  useEffect(() => {
    setBoardsList(bList)
    // getArticlesApi()
    //   .then((res)=>{
    //     console.log(res.data)
    //     setBoardsList(res.data)
    //   })
    //   .catch((err)=>{
    //     console.error(err.data);
    //   })
  }, [])
  // nav-function
  const onMoveStatistics = () => {
    navigate(`/group/statistics/${groupSeq}`);
  };
  // function
  return (
    <>
      {
        modalBtn === 1
        ? <Modal
            setModalBtn={setModalBtn}
            setboardIdx={setboardIdx}
            boards={boardsList[boardIdx]}
            maxBoard={boardsList.length}
          />
        : <div onClick={() => setModalBtn(1)}>모달을 켜주세요</div>
      }
      <button onClick={onMoveStatistics}>통계 보기</button>
      <div>
        <div onClick={() => setLookList(0)}>전체로 보기</div>
        <div onClick={() => setLookList(1)}>월별로 보기</div>
      </div>
      <div>
      { 
        lookList === 0
        ? <div>전체로 보겠습니다</div>
        : lookList === 1
          ? <div>월별로 보겠습니다</div>
          : null
      }
      </div>
      <div className='grid-display'>
      {
        lookList === 0
        ? bList.map((data, i) => {
          return (
            <>
              <AllList
                key={i}
                data={data}
                boardsList={boardsList}
                setModalBtn={setModalBtn}
                setboardIdx={setboardIdx}
              />
            </>
          )
        })
        : lookList === 1
          ? bList.map((data, i) => {
            return (
              <MonthList
                key={i}
                data={data}
                boardsList={boardsList}
                setModalBtn={setModalBtn}
                setboardIdx={setboardIdx}
              />
            )
          })
          : null 
      }
      </div>
    </>
  )
}

function AllList(props) {
  return (
    <div className="all">
      <div 
        style={{ margin:'1px', width:'95%', height:'240px', backgroundColor: 'gray' }}
        onClick={()=> {
          props.setModalBtn(1)
          props.setboardIdx(props.boardsList.findIndex(e => e.boardSeq === props.data.boardSeq));
        }}
      >{ props.data.content }</div>
    </div>
  )
}

function MonthList(props) {
  return (
    <div className="month">
      <div>월별로 볼래요</div>
      <div
        style={{ margin:'1px', width:'180px', height:'240px', backgroundColor: 'gray' }}
        onClick={()=> {
          props.setModalBtn(1)
          props.setboardIdx(props.boardsList.findIndex(e => e.boardSeq === props.data.boardSeq));
        }}
      >{ props.data.content }</div>
    </div>
  )
}

function Modal(props) {
  const outSection = useRef()
  return (
    <div
      className="modal"
      style={{ 
      width:'100vw', 
      height:'100vh',}}
      ref={outSection}
      onClick={(e) => { if (e.target === outSection.current) props.setModalBtn(0);}}
    >
      <div style={{ width:'80px', height:'40px', backgroundColor: 'pink' }} onClick={() => props.setModalBtn(0)}>X BUTTON</div>
      <section>
        <div
          style={{ margin:'1px', width:'180px', height:'240px', backgroundColor: 'gray' }}
        ></div>
        <div>{ props.boards.boardSeq }</div>
        <div>{ props.boards.content }</div>
        <div onClick={() => {
          props.setboardIdx(boardIdx => { if (boardIdx === 0) {return props.maxBoard - 1}; return boardIdx-1 })
        }}>왼쪽으로</div>
        <div onClick={() => {
          props.setboardIdx(boardIdx => { if (boardIdx === props.maxBoard - 1) {return 0}; return boardIdx+1 })
        }}>오른쪽으로</div>
      </section>
    </div>
  )
}
