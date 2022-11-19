// import React, { useState,useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import NavBar from "../../Components/NavBar/NavBar";
// import axios from "axios";
// import "./WriteBoard.css";
// import { writeMemoryApi } from "../../api/WriteBoardApi";

// import Swal from "sweetalert2";

// function WriteBoard() {
//   const [content, setContent] = useState<string>('');
//   const { groupSeq } = useParams();
//   const navigate = useNavigate();

//   // 비디오 파일
//   const [videoFile, setVideoFile] = useState({
//     // fileObject: "",
//     preview_URL: `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`,
//     type: "image",
//   });

//   let inputRef: HTMLInputElement | null | undefined;

//   // 이미지 업로드
//   const [files, setFiles] = useState('')
  
//   const [imgBase64, setImgBase64] = useState<string>(); // 미리보기를 -구현할 state
//   const [imgFile, setImgFile] = useState<FileList | null>();
//   const [defaultImg, setDefaultImg] = useState(
//     `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`
//   );

//   const onHandleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setImgFile(event.target.files);
//   };

//   const onChangePreview = () => {
//     if (!files) {
//       return false
//     }
//     const imgEl:any = document.getElementById('img')

//     const reader:any = new FileReader()
//     reader.onload = () => {
//       imgEl.src = reader.result
//       imgEl.style.width = "100%"
//       imgEl.style.height = "100%"
//     }
//     reader.readAsDataURL(files[0])
//     console.log(imgEl)
//   }

//   useEffect(() => {
//     onChangePreview()
 
//    },[files])

//   const onSaveWriting = () => {
//     if(content === ''){
//       // alert("내용을 입력해주세요")

//       Swal.fire({
//         icon: "error",
//         title: "작성 실패",
//         text: "글 내용을 작성해주세요",
//       });


//       return
//     }
//     let form = new FormData();
//     // const imgs:any = document.getElementById("img").files;
//     const imgs:any = document.getElementById("img");


//     if (imgs.length !== 0) {
//       for (let i = 0; i < imgs.length; i++) {
//         form.append("image", imgs[i]);
//       }
//     }else {
//       const imgBlob = new File([], '')
//       form.append("image", imgBlob)


//     }
//     const videoFile:any = document.getElementById("video").files[0];
//     // const videoInput = document.getElementById("video") as HTMLInputElement | null;
//     // const videoFile  = videoInput?.files;
    
//     form.append("content", content);
    
    
//     if (videoFile !== undefined){
//       // console.log("form:", form);
//       form.append("video", videoFile);
//     }
//     else {
//       const blob = new File([], '')
//       form.append("video", blob)
//     }
//     form.append("groupSeq", groupSeq);

//     axios
//       .post("/boards", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Authorization": sessionStorage.getItem("accessToken")
//         },
//       })
//       .then(()=>{

//         Swal.fire({
//           icon: "success",
//           title: "추억 등록 완료!",
//           showConfirmButton: false,
//           timer: 1300,
//         });
//         // navigate("/diarylist", { replace: true });
//         navigate("/main", { replace: true});
//       });
//   };

//   const saveVideoImage = (e: any) => {
//     e.preventDefault();
//     // 미리보기 url 만들기 // 파일이 존재하면 file 읽기
//     if (e.target.files[0]) {
//       // 새로운 파일 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
//       URL.revokeObjectURL(videoFile.preview_URL);
//       // 새로운 미리보기 URL 생성
//       const preview_URL = URL.createObjectURL(e.target.files[0]);
//       const fileType = e.target.files[0].type.split("/")[0];

//       if (fileType === "video") {
//         let videoElement = document.createElement("video");
//         videoElement.src = preview_URL;
//         /*
//           video 길이 제한!
//           videoElement의 readyState가 4면 비디오가 로딩이 된 것이므로 길이를 판별할 수 있다
//           video가 재생할 수 있는 상태로 만드는 과정이 비동기적으로 실행되기 때문에
//           setInterval로 비디오가 로딩된 상태가 될 때까지 계속 확인하면서 기다려준다
//         */
//         const timer = setInterval(() => {
//           if (videoElement.readyState === 4) {
//             if (videoElement.duration > 16) {
//               alert("동영상의 길이가 16초보다 길면 안됩니다");
//               // src에 넣지 않을 것이므로 미리보기 URL 제거
//               URL.revokeObjectURL(preview_URL);
//             } else {
//               setVideoFile({
//                 fileObject: e.target.files[0],
//                 preview_URL: preview_URL,
//                 type: fileType,
//               });
//             }
//             clearInterval(timer);
//           }
//         }, 500);
//       } else {
//         // image일 땐 시간제한이 없으므로 그냥 상태에 넣어줌
//         setVideoFile({
//           fileObject: e.target.files[0],
//           preview_URL: preview_URL,
//           type: fileType,
//         });
//       }
//     }
//   };

//   //  상태 초기화하기
//   const deleteVideoImage = () => {
//     // createObjectURL()을 통해 생성한 기존 URL을 폐기
//     URL.revokeObjectURL(videoFile.preview_URL);
//     setVideoFile({
//       fileObject: "",
//       preview_URL: `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`,
//       type: "image",
//     });
//   };



//   return (
//     <>
    
//     <NavBar />
//       <div className="write-board-page">
     
//         {/* group-name 부분 */}
//         <div className="group-name-wrapper" style={{marginTop:"10vh"}}>
//           <div className="group-name">자율 프로젝트</div>
//         </div>
//         {/* 글, 사진, 영상 영역 */}
//         <div className="group-content-wrapper">
//           {/* 글 */}
//           <BoardWrapper>
//             <ContentHeader>
//               <img
//                 className="content-header-icon"
//                 alt=""
//                 src={
//                   process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
//                 }
//               />
//             </ContentHeader>

//             <ContentWrapper>
//               <textarea className="writing-content" onChange={(e) => { setContent(e.target.value) }}></textarea>
//             </ContentWrapper>

//           </BoardWrapper>

//           {/* 사진 */}
//           <BoardWrapper>
//             <ContentHeader>
//               <img
//                 className="content-header-icon"
//                 alt=""
//                 src={
//                   process.env.PUBLIC_URL + "/assets/icon-img/photo-camera.png"
//                 }
//               />
//             </ContentHeader>

//             <ContentWrapper>
//               {/* default 이미지 & 미리보기 이미지 */}
//               <div className="photo-content">
//                 {/* <img className="photo-default-img" alt="" src={process.env.PUBLIC_URL + '/assets/default-img/default-image.jpg'} /> */}
//                 {imgFile === null ? (
//                   <PhotoWrapper>
//                     <img
//                       className="photo-preview-img"
//                       alt="#"
//                       src={defaultImg}
//                     />
//                   </PhotoWrapper>
//                 ) : (
//                   <>
//                     {imgBase64.map((item, i) => {
//                       return (
//                         <PhotoWrapper key={i}>
//                           <img
//                             className="photo-preview-img"
//                             src={item}
//                             alt="First Slide"
//                           />
//                         </PhotoWrapper>
//                       );
//                     })}
//                   </>
//                 )}
//               </div>
//               <div>
//                 <input
//                   multiple
//                   type="file"
//                   id="img"
//                   name="file"
//                   accept="image/*"
//                   onChange={onHandleChangeFile}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="img">
//                   {/* <div className="find-file-btn">사진 올리기</div> */}
//                   <div className="upload-img-btn btn btn__secondary"><p>사진 올리기</p></div>
//                 </label>
//               </div>
//             </ContentWrapper>
//           </BoardWrapper>

//           {/* 영상 */}
//           <BoardWrapper>
//             <ContentHeader>
//               <img
//                 className="content-header-icon"
//                 alt=""
//                 src={process.env.PUBLIC_URL + "/assets/icon-img/video-btn.png"}
//               />
//             </ContentHeader>

//             <ContentWrapper>
//               {/* <VideoUploader /> */}
//               <div className="uploader-wrapper">
//                 <input
//                   type="file"
//                   accept="video/*, image/*"
//                   id="video"
//                   onChange={saveVideoImage}
//                   // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
//                   // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
//                   onClick={(e) => (e.target as HTMLInputElement).value = ''}
//                   ref={(refParam) => (inputRef = refParam)}
//                   style={{ display: "none" }}
//                 />
//                 <div className="file-wrapper">
//                   {videoFile.type === "image" ? (
//                     <img
//                       alt=""
//                       src={videoFile.preview_URL}
//                       style={{
//                         width: "25vw",
//                         height: "50vh",
//                         marginTop:"2vh"
//                         // ObjectFit: "contain",
//                       }}
//                     />
//                   ) : (
//                     <video
//                       controls={true}
//                       autoPlay={true}
//                       src={videoFile.preview_URL}
//                     />
//                   )}
//                 </div>
//                 <div className="upload-button-wrapper">
//                   <button 
//                     className="find-file-btn btn btn__secondary" 
//                     onClick={() => inputRef!.click()}>
//                     영상업로드
//                   </button>
//                   <button
//                     className="find-file-btn btn btn__secondary"
//                     onClick={deleteVideoImage}
//                   >
//                     삭제
//                   </button>
//                 </div>
//               </div>
//             </ContentWrapper>
//           </BoardWrapper>
//         </div>
//       </div>

//       {/* <div className="complete-btn-wrapper">
//         <button onClick={onSaveWriting}>글쓰기 완료</button>
//       </div> */}

//       <div className="board-complete-btn-wrapper">
//         <button 
//         style={{fontFamily:"fontone", fontSize:"23px", width:"7.5vw"}}
//         className="w-btn w-btn-gra2 w-btn-gra-anim" 
//         type="button"
//         onClick={onSaveWriting}
//         >
//         추억생성
//         </button>
//     </div>
//     </>
//   );
// }

// export default WriteBoard;

// const BoardWrapper = styled.div`
//   // background-color: green;

//   width: 28vw;
//   height: 70vh;

//   margin-right: 2vw;
//   margin-left: 2vw;
// `;

// const ContentHeader = styled.div`
//   // background-color: aqua;

//   width: 26vw;
//   height: 8vh;

//   margin-left: 0.6vw;
//   margin-top: 1vh;
// `;
// const ContentWrapper = styled.div`
//   // background-color: aqua;

//   width: 26vw;
//   height: 58vh;

//   margin-left: 0.6vw;
//   margin-top: 1vh;
// `;

// const PhotoWrapper = styled.div`
//   // background-color: antiquewhite;

//   width: 24vw;
//   height: 45vh;

//   margin-left: 1vw;
//   margin-bottom: 3vh;
//   /* margin-top: 4vh; */
// `;
