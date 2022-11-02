import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesApi } from '../../api/MemoryApi.js'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css';


export default function MemoryCard() {
  return (
    <>
    <div className='memory-article-img'>
      <div className='click-memory'>
        <img className='memory-img' alt="#" src={process.env.PUBLIC_URL + '/assets/img/bp.jpg'}/>
      </div>
    </div>
    </>
  )
}