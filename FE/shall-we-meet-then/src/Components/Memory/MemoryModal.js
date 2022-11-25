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
} from '../../api/MemoryApi'
import './MemoryModal.css'

export default function Memory(props) {
  const baseURL = "http://k7d105.p.ssafy.io"
  const [article, setArticle] = useState({})
  const [nickName, setNickName] = useState('')
  const outSection = useRef()
  useEffect(() => {

    console.log(props.article)
    console.log(props.articleIndex)

    getArticleApi(props.boardSeq)
      .then(res => {
        setNickName(res.data.groupMember.nickname)
        setArticle(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [props.articleIndex])
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
                          {
                            props.articleIndex === 0
                            ? null
                            : <button
                                onClick={() => {
                                  if (props.articleIndex > 0) {
                                    const nextIndex = props.articleIndex-1
                                    setNickName(props.articles[nextIndex].groupMember.nickname)
                                    setArticle(props.articles[nextIndex])
                                    props.setBoardSeq(props.articles[nextIndex].boardSeq)
                                    props.setArticleIndex(i => i-1)
                                  } else {
                                    const nextIndex = props.articles.length-1
                                    setNickName(props.articles[nextIndex].groupMember.nickname)
                                    setArticle(props.articles[nextIndex])
                                    props.setBoardSeq(props.articles[nextIndex].boardSeq)
                                    props.setArticleIndex(nextIndex)
                                  }
                                }}
                                className='Memory-next-btn'>
                                <div className='Memory-next-btn-div'><span className='modal-btn-text'><LeftOutlined/></span></div>
                              </button>
                          }
                        </div>
                        <div className='Memory-next-content next-right'>
                          {
                              props.articleIndex === props.articles.length-1
                              ? null
                              : <button
                                  onClick={() => {
                                    if (props.articleIndex < props.articles.length-1) {
                                      const nextIndex = props.articleIndex+1
                                      setNickName(props.articles[nextIndex].groupMember.nickname)
                                      setArticle(props.articles[nextIndex])
                                      props.setBoardSeq(props.articles[nextIndex].boardSeq)
                                      props.setArticleIndex(i => i+1)
                                    } else {
                                      const nextIndex = 0
                                      console.log(props.articles);
                                      setNickName(props.articles[nextIndex].groupMember.nickname)
                                      setArticle(props.articles[nextIndex])
                                      props.setBoardSeq(props.articles[nextIndex].boardSeq)
                                      props.setArticleIndex(nextIndex)
                                    }
                                  }}
                                  className='Memory-next-btn'>
                                  <div className='Memory-next-btn-div'><span className='modal-btn-text'><RightOutlined/></span></div>
                                </button>
                          }
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
                            {/* <video width="320" height="240" src={baseURL + `/boards/${props.boardSeq}/video-download`} autoPlay={true} type="video/quicktime"></video>  */}
                          </div>
                          <div className='Memory-article-text'>
                            <div className='Memory-article-text-nickname'>
                              <div className='Memory-article-text-content'>
                                {nickName}
                              </div>
                            </div>
                            <div className='Memory-article-text-content'>
                              <div className='a'>
                                <hr style={{marginTop:'-8px', width:'110%'}}/>
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
