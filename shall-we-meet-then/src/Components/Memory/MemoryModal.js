import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import './MemoryModal.css'

export default function Memory(props) {
  const outSection = useRef()
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
              onClick={() => props.setModalBtn(0)}
              className='Memory-modal-exit-text'>
              x
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
                            <div className='Memory-next-btn-div'><span className='modal-btn-text'>&lt;</span></div>
                          </button>
                        </div>
                        <div className='Memory-next-content next-right'>
                          <button className='Memory-next-btn'>
                            <div className='Memory-next-btn-div'><span className='modal-btn-text'>&gt;</span></div>
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
                            <img className='' alt="#" src={process.env.PUBLIC_URL + '/assets/img/bp.jpg'}/>
                          </div>
                          <div className='Memory-article-text'>
                            <div className='Memory-article-text-nickname'>
                              <div className='Memory-article-text-content'>
                                글 쓴 사 람 N i c k n a m e
                              </div>
                            </div>
                            <div className='Memory-article-text-content'>
                              <div className='a'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mollis nulla.
                                Phasellus lacinia tempus mauris eu laoreet. Proin gravida velit dictum dui consequat malesuada. so we plcajkfahwkehagjkdfhvjkadfjk;bdjkfaljla;ejf;jweiojazdfvn,dkls oawilefjialsjlkalgaskjawekgjw iflawepfaj urigaj;rhvj s'jefukl arguwkef \n
                                that ok
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