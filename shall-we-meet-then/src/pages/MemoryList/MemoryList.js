import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function MemoryList() {
  const navigate = useNavigate();
  const { groupSeq } = useParams()
  const statistics = () => {
    navigate(`/group/statistics/${groupSeq}`);
  };
  return (
    <>
      <div>MemoryList</div>
      <button onClick={statistics}>통계 보기</button>
    </>
  )
}
