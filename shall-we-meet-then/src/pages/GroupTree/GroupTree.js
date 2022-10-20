import React from 'react'
import './GroupTree.css'

// api
// 남은 열람날짜 조회 api : D-Day별로 UI가 변경 /  
// 글쓰기 api : content, image, video
// Group 정보 조회 api : 그룹이름 가져오기 
function GroupTree() {
  return (
    <>
    {/* <div>GroupTree</div> */}
    <div className='group-tree-img-wrapper'>
      <div>
        <img className="group-tree-ground-img" alt="#" src={process.env.PUBLIC_URL + '/assets/img/ground.jpg'}/>
      </div>
      <div>
        <img className="group-tree-tree-img" alt="" src={process.env.PUBLIC_URL + '/assets/img/grouptree_sample.png'} />
      </div>
    </div>
          
    
    </>
  )
}

export default GroupTree