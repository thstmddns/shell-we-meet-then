import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import './MemoryModal.css'

export default function Memory(props) {
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
      </section>
    </div>
  )
}
