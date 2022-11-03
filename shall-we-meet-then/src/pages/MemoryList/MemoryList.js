import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import Nav from '../../Components/NavBar/NavBar'
import './MemoryList.css'
import MemoryHeader from '../../Components/MemoryList/MemoryHead'
import MemoryBody1 from '../../Components/MemoryList/MemoryBody1'
import MemoryBody2 from '../../Components/MemoryList/MemoryBody2'
import MemoryBody3 from '../../Components/MemoryList/MemoryBody3'
import Modal from '../../Components/Memory/MemoryModal'

export default function MemoryList() {
  const [bodyBtn, setBodyBtn] = useState(0)
  const [modalBtn, setModalBtn] = useState(0)
  const params = useParams()
  function Components(bodyBtn) {
    switch (bodyBtn) {
      case 0 :
        return  (<MemoryBody1
                  setBodyBtn={setBodyBtn}
                  setModalBtn={setModalBtn}
                />)
      case 1 :
        return  (<MemoryBody2
                  setBodyBtn={setBodyBtn}
                  setModalBtn={setModalBtn}
                />)
      default :
        return (<MemoryBody3
                  setBodyBtn={setBodyBtn}
                  setModalBtn={setModalBtn}
                />)
    }
  }
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
          {Components(bodyBtn)}
        </div>
      </div>
    </div>
    </>
  )
}