import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NavBar from "../../Components/NavBar/NavBar";

import VideoUploader from "./VideoUploader";

import "./WriteBoard.css";

function WriteBoard() {
  const [content, setContent] = useState("");
  const { groupSeq } = useParams();
  const navigate = useNavigate();

  const [returnImg, setReturnImg] = useState("");
  const [imgBase64, setImgBase64] = useState([]); // 미리보기를 구현할 state
  const [imgFile, setImgFile] = useState("");
  const [defaultImg, setDefaultImg] = useState(
    `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`
  );

  const addArticle = () => {
    let form = new FormData();
    const imgs = document.getElementById("img").files;
    const videoFile = document.getElementById("video").files[0];
    form.append("content", content);
    form.append("image", imgs);
    form.append("video", videoFile);
    form.append("groupSeq", groupSeq);
    axios
      .post("/boards", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(navigate("/main"));
  };

  const onHandleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);

    // 미리보기 state
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 파일을 읽어서 버퍼에 저장중

        // 파일 상태업데이트
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            // 변환해서 미리보기 이미지에 넣어주는 부분
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  return (
    <>
      <div className="write-board-page">
        <NavBar />
        {/* group-name 부분 */}
        <div className="group-name-wrapper">
          <div className="group-name">자율 프로젝트</div>
        </div>
        {/* 글, 사진, 영상 영역 */}
        <div className="group-content-wrapper">
          {/* 글 */}
          <BoardWrapper>
            <ContentHeader>
              <img
                className="content-header-icon"
                alt=""
                src={
                  process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
                }
              />
            </ContentHeader>

            <ContentWrapper>
              <textarea className="writing-content"></textarea>
            </ContentWrapper>
          </BoardWrapper>

          {/* 사진 */}
          <BoardWrapper>
            <ContentHeader>
              <img className="content-header-icon" alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/photo-camera.png"} />
            </ContentHeader>

            <ContentWrapper>
              {/* default 이미지 & 미리보기 이미지 */}
              <div className="photo-content">
                {/* <img className="photo-default-img" alt="" src={process.env.PUBLIC_URL + '/assets/default-img/default-image.jpg'} /> */}
                {imgFile === "" 
                ? (
                  <PhotoWrapper>
                  <img
                    className="photo-preview-img"
                    alt="#"
                    src={defaultImg}
                  />
                  </PhotoWrapper>
                ) 
                : (
                  <>
                    {
                    imgBase64.map((item) => {
                      return (
                      <PhotoWrapper>
                        <img
                          className="photo-preview-img"
                          src={item}
                          alt="First Slide"
                        />
                      </PhotoWrapper>
                      );
                  })
                }
                  </>
                )
                }
              </div>
        <div>
          <input
            multiple="multiple"
            type="file"
            id="img"
            name="file"
            accept="image/*"
            onChange={onHandleChangeFile}
            style={{ display: "none" }}
          />
          <label for="file">
            <div className="find-file-btn">사진 올리기</div>
          </label>

        </div>

            </ContentWrapper>
          </BoardWrapper>

          {/* 영상 */}
          <BoardWrapper>
            <ContentHeader>
              <img
                className="content-header-icon"
                alt=""
                src={process.env.PUBLIC_URL + "/assets/icon-img/video-btn.png"}
              />
            </ContentHeader>

            <ContentWrapper>
            {/* <h1>동영상</h1>
              <input type='file' id='video'/> */}
            <VideoUploader />
            
            </ContentWrapper>
          </BoardWrapper>
        </div>
      </div>
      {/* <div>
        <textarea 
          value={content}
          onChange={(e) => { setContent(e.target.value) }} 
        />
        <br />
        <h1>사진</h1>
        <input type='file' id='img' multiple />
        <br />
        <h1>동영상</h1>
        <input type='file' id='video'/>
        <br />
        <button onClick={addArticle}>글 쓰기</button>
    </div> */}
    </>
  );
}

export default WriteBoard;

const BoardWrapper = styled.div`
  // background-color: green;

  width: 28vw;
  height: 70vh;

  margin-right: 2vw;
  margin-left: 2vw;
`;

const ContentHeader = styled.div`
  // background-color: aqua;

  width: 26vw;
  height: 8vh;

  margin-left: 0.6vw;
  margin-top: 1vh;
`;
const ContentWrapper = styled.div`
  // background-color: aqua;

  width: 26vw;
  height: 58vh;

  margin-left: 0.6vw;
  margin-top: 1vh;
`;

const PhotoWrapper = styled.div`
  // background-color: antiquewhite;

  width: 24vw;
  height: 45vh;

  margin-left: 1vw;
  margin-bottom: 3vh;
  /* margin-top: 4vh; */
`
