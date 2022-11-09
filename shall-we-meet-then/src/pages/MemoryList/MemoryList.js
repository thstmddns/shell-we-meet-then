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
import Nav from '../../Components/NavBar/NavBar'
import './MemoryList.css'
import MemoryHeader from '../../Components/MemoryList/MemoryHead'
import MemoryComponent from '../../Components/MemoryList/MemoryComponent'
import Modal from '../../Components/Memory/MemoryModal'

export default function MemoryList() {
  const [bodyBtn, setBodyBtn] = useState(0)
  const [modalBtn, setModalBtn] = useState(0)
  const [boardSeq, setBoardSeq] = useState(null)
  const { groupSeq } = useParams()
  return (
    <>
    {
      modalBtn === 1
      ? <Modal
          boardSeq={boardSeq}
          setModalBtn={setModalBtn}
        />
      : null
    }
    <Nav/>
    <div className='memory-main'>
      <div className='memory-list'>
        <div className='memory-list-body'>
          <MemoryHeader/>
          <div className='memory-item-list'>
            <div
              onClick={() => {setBodyBtn(0)}}
              className={`memory-item ${ bodyBtn===0? 'memory-item-click' : ''}`}>
              <div>게시글 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(1)}}
              className={`memory-item ${ bodyBtn===1? 'memory-item-click' : ''}`}>
              <div>영상 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(2)}}
              className={`memory-item ${ bodyBtn===2? 'memory-item-click' : ''}`}>
              <div>글 </div>
            </div>
          </div>
          <MemoryComponent
            setBoardSeq={setBoardSeq}
            setModalBtn={setModalBtn} />
        </div>
      </div>
    </div>
    </>
  )
}