import React from 'react'

function WriteAreaComponent() {
  return (
    <div>WriteAreaComponent</div>
  )
}

export default WriteAreaComponent

// import React from 'react'
// import { BoardWrapper, ContentHeader, ContentWrapper, PhotoWrapper } from './styles'

// function WriteAreaComponent({content:any}) {
//   return (
//     <>
//       <BoardWrapper>
//         <ContentHeader>
//           <img
//             className="content-header-icon"
//             alt=""
//             src={
//               process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
//             }
//           />
//         </ContentHeader>

//         <ContentWrapper>
//           <textarea 
//             className="writing-content"
//             placeholder="내용을 입력하세요"
//             // ref={contentRef}
//             // value={content}
//             // onChange={(e) => setContent(e.target.value)}
//           >
//           </textarea>
//         </ContentWrapper>       
//       </BoardWrapper>
//     </>
//   )
// }

// export default WriteAreaComponent