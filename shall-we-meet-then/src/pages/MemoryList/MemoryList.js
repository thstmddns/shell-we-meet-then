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
import MemoryBody1 from '../../Components/MemoryList/MemoryBody1'
import MemoryBody2 from '../../Components/MemoryList/MemoryBody2'
import MemoryBody3 from '../../Components/MemoryList/MemoryBody3'
import Modal from '../../Components/Memory/MemoryModal'

import MemoryComponent from '../../Components/MemoryList/MemoryComponent.js';

export default function MemoryList() {
  const [bodyBtn, setBodyBtn] = useState(0)

  const [option, setOption] = useState(0)

  const [modalBtn, setModalBtn] = useState(0)
  const { groupSeq } = useParams()
  const [articles, setArticles] = useState([])
  useEffect(() => {
    getArticlesApi({ groupSeq })
      .then(res => {
        console.log(res.data);
        setArticles(res.data)
        Test(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  function Test (testArticle) {
    console.log("Test ARTICLES:", testArticle)

    return (
      <>
        <div>{testArticle[0]}</div>
      </>
    )
  }

  // function MemoryComponent(option) {

  // }

  // function Components(bodyBtn) {
  //   switch (bodyBtn) {
  //     case 0 :
  //       return  (<MemoryBody1
  //                 articles={articles}
  //                 setBodyBtn={setBodyBtn}
  //                 setModalBtn={setModalBtn}
  //               />)
  //     case 1 :
  //       return  (<MemoryBody2
  //                 setBodyBtn={setBodyBtn}
  //                 setModalBtn={setModalBtn}
  //               />)
  //     default :
  //       return (<MemoryBody3
  //                 setBodyBtn={setBodyBtn}
  //                 setModalBtn={setModalBtn}
  //               />)
  //   }
  // }
  
  return (
    <>
    {
      modalBtn === 1
      ? <Modal
          setModalBtn={setModalBtn}
        />
      : null
    }
    <Nav/>
    <div></div>
    <div className='memory-main'>
      <div className='memory-list'>
        <div className='memory-list-body'>
          <MemoryHeader/>
          {/*  */}
          <div className='memory-item-list'>
            <div
              onClick={() => {setBodyBtn(0)}}
              className='memory-item memory-item-click'>
              <div>게시글 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(1)}}
              className='memory-item'>
              <div>영상 </div>
            </div>
            <div
              onClick={() => {setBodyBtn(2)}}
              className='memory-item'>
              <div>글 </div>
            </div>
          </div>
          {/*  */}
          {/* {
            bodyBtn === 0
            ?(
              <>
                <MemoryComponent articles={articles} />
              </>
            )
            : (
                bodyBtn === 1
                ? (
                  <>
                    <h3>bodyBtn === 1 test</h3>
                  </>
                )
                : (
                  // bodyBtn === 2
                  <>
                    <h3>bodyBtn === 2 test</h3>
                  </>
                )
            )
          
          } */}
          <Test />
        </div>
      </div>
    </div>
    </>
  )
}