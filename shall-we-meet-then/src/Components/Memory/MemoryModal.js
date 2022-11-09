import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons'
import {
  getArticlesApi,
  getArticleApi,
  getVideoApi,
  getThumbnailApi,
  getImageApi,
  getArticleCount,
  getTotalArticleCount,
} from '../../api/MemoryApi.js'
import './MemoryModal.css'

export default function Memory(props) {
  const baseURL = "http://k7d105.p.ssafy.io:8080"
  const [article, setArticle] = useState({})
  const [nickName, setNickName] = useState('')
  const outSection = useRef()
  useEffect(() => {
    getArticleApi(props.boardSeq)
      .then(res => {
        console.log(res.data);
        setNickName(res.data.groupMember.nickname)
        setArticle(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])
  return (
    <>
    <div className='Memory-modal'>
      <div className='Memory-modal-hole'>
        <div
          ref={outSection}
          onClick={(e) => { if (e.target === outSection.current) props.setModalBtn(0);}}
          className='Memory-modal-bg'></div>
        <div className='Memory-modal-exit'>
          <div className='Memory-modal-exit-positon'>
            <div
              className='Memory-modal-exit-text'>
                <CloseOutlined
                  onClick={() => {
                    props.setModalBtn(0);
                  }}
                />
            </div>
          </div>
        </div>
        <div className='Memory-modal-obj'>
          <div className='Memory-modal-positon'>
            <div className='Memory-modal-loc'>
              <div className='Memory-modal-loc-positon'>
                <div className='Memory-modal-loc-loc'>
                  <div className='Memory-next'>
                    <div className='Memory-next-container'>
                      <div className='Memory-next-container-content'>
                        <div className='Memory-next-content next-left'>
                          <button className='Memory-next-btn'>
                            <div className='Memory-next-btn-div'><span className='modal-btn-text'><LeftOutlined/></span></div>
                          </button>
                        </div>
                        <div className='Memory-next-content next-right'>
                          <button className='Memory-next-btn'>
                            <div className='Memory-next-btn-div'><span className='modal-btn-text'><RightOutlined/></span></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='Memory-modal-content'>
                    <div className='Memory-modal-content-box'>
                      <article className='Memory-article'>
                        <div className='Memory-article-content'>
                          <div className='Memory-article-img'>
                            <img className='modal-img' alt="#" src={baseURL + `/boards/${props.boardSeq}/image-download`}/>
                          </div>
                          <div className='Memory-article-text'>
                            <div className='Memory-article-text-nickname'>
                              <div className='Memory-article-text-content'>
                                {nickName}
                              </div>
                            </div>
                            <div className='Memory-article-text-content'>
                              <div className='a'>
                                {article.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
