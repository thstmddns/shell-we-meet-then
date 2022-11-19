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
} from '../../api/MemoryApi'
import Nav from '../../Components/NavBar/NavBar'
import './MemoryList.css'
import MemoryHeader from '../../Components/MemoryList/MemoryHead'
import MemoryComponent from '../../Components/MemoryList/MemoryComponent'
import MemoryComponent2 from '../../Components/MemoryList/MemoryComponent2'
import MemoryComponent3 from '../../Components/MemoryList/MemoryComponent3'
import Modal from '../../Components/Memory/MemoryModal'
import Modal2 from '../../Components/Memory/MemoryModal2'


type GroupMember  = {
  agree: string; 
  groupMemberSeq: number; 
  score: number; 
}

export interface Article {
  boardSeq: number; 
  content: string;
  groupMember: GroupMember;
  hasImage: boolean; 
  hasVideo: boolean;
}
  

export default function MemoryList() {
  const [bodyBtn, setBodyBtn] = useState(0)
  const [modalBtn, setModalBtn] = useState(0)
  const [boardSeq, setBoardSeq] = useState(null)
  const [articlePhotoIndex, setArticlePhotoIndex] = useState(0)
  const [articleVideoIndex, setArticleVideoIndex] = useState(0)
  const [articlesPhoto, setArticlesPhoto] = useState([])
  const [articlesVideo, setArticlesVideo] = useState([])
  const { groupSeq } = useParams()

  
  
  useEffect(() => {
    getArticlesApi(Number(groupSeq))
      .then(res => {
        console.log(res.data);
        const resultImage = res.data.filter((obj:Article) => obj.hasImage);
        const resultVideo = res.data.filter((obj:Article)=> obj.hasVideo);
        setArticlesPhoto(resultImage);
        setArticlesVideo(resultVideo);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  useEffect(() =>{
    setArticlePhotoIndex(articlesPhoto.findIndex((i:any) => i.boardSeq === boardSeq))
    setArticleVideoIndex(articlesVideo.findIndex((i:any) => i.boardSeq === boardSeq))
  }, [boardSeq])



  return (
    <>
    {
      modalBtn === 1
      ? bodyBtn === 0
        ? <Modal
            articles={articlesPhoto}
            articleIndex={articlePhotoIndex}
            setArticleIndex={setArticlePhotoIndex}
            boardSeq={boardSeq}
            setBoardSeq={setBoardSeq}
            setModalBtn={setModalBtn}
          />
        : <Modal2
            articles={articlesVideo}
            articleIndex={articleVideoIndex}
            setArticleIndex={setArticleVideoIndex}
            boardSeq={boardSeq}
            setBoardSeq={setBoardSeq}
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
              <div>사진 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(1)}}
              className={`memory-item ${ bodyBtn===1? 'memory-item-click' : ''}`}
            >
              <div>비디오 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(2)}}
              className={`memory-item ${ bodyBtn===2? 'memory-item-click' : ''}`}>
              <div>통계 </div>
            </div>
          </div>
          {
            bodyBtn === 0
            ?  <MemoryComponent
                setBoardSeq={setBoardSeq}
                setModalBtn={setModalBtn} />
            : bodyBtn === 1
              ? <MemoryComponent2
                  setBoardSeq={setBoardSeq}
                  setModalBtn={setModalBtn} />
              : <MemoryComponent3
                  setBoardSeq={setBoardSeq}
                  setModalBtn={setModalBtn} />
          }
        </div>
      </div>
    </div>
    </>
  )
}