import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import Nav from '../../Components/NavBar/NavBar'
import './MemoryList.css';
import './Modal.css'
import MemoryHeader from '../../Components/Memory/MemoryHead'
import MemoryBody1 from '../../Components/Memory/MemoryBody1'
import MemoryBody2 from '../../Components/Memory/MemoryBody2'
import MemoryBody3 from '../../Components/Memory/MemoryBody3'

export default function MemoryList() {
  const [bodyBtn, setBodyBtn] = useState(0)
  function Components(bodyBtn) {
    switch (bodyBtn) {
      case 0 :
        return  (<MemoryBody1
                  setBodyBtn={setBodyBtn}
                />)
      case 1 :
        return  (<MemoryBody2
                  setBodyBtn={setBodyBtn}
                />)
      default :
        return (<MemoryBody3
                  setBodyBtn={setBodyBtn}
                />)
    }
  }
  return (
    <>
    <Nav/>
    <div className='memory-main'>
      <div className='memory-list'>
        <div className='memory-list-body'>
          <MemoryHeader/>
          {Components(bodyBtn)}
        </div>
      </div>
    </div>
    </>
  )
}