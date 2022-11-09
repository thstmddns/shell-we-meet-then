import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { CloseOutlined } from '@ant-design/icons'
import {
  getArticlesApi,
  getArticleApi,
  getVideoApi,
  getThumbnailApi,
  getImageApi,
  getArticleCount,
  getTotalArticleCount,
} from '../../api/MemoryApi.js'
import './Modal.css'


export default function GroupModal(props) {
  const outSection = useRef()
  return (
    <div
      className="modal"
      ref={outSection}
      onClick={(e) => { if (e.target === outSection.current) props.setGroupModalBtn(0);}}
    >
      <section>
        <div>
          <CloseOutlined
            onClick={() => {
              props.setGroupModalBtn(0);
            }}
            className="x-btn"
          />
        </div>
        <div>
          {
            props.groupMembers.map((a, i) => {
              return (
                <>
                { a.nickname }
                </>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}
