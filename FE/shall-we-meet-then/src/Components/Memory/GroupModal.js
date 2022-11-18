import React, { useEffect, useState, useRef } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import './Modal.css'


export default function GroupModal(props) {
  const [groupMembers, setGroupMembers] = useState([])
  const outSection = useRef()
  
  useEffect(() => {
    console.log(props.groupMembers);
    const nickName = props.groupMembers.map(a => {
      return [a.nickname, a.agree]
    })
    setGroupMembers(nickName)
  }, [])


  return (
    <div
      className="modal"
      ref={outSection}
      onClick={(e) => { if (e.target === outSection.current) props.setGroupModalBtn(0);}}
      style={{color:"black"}}
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
        <div className='group-body'>
          <h2>그룹 참여 맴버 현황</h2>
          <div className='group-content'>
            {
              groupMembers.map((arr, i) => {
                return (
                  <div className='group-set' key={i}>
                    <div className='group-agree'>{ arr[1] }</div>
                    <div className='group-item'>{ arr[0] }</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}
