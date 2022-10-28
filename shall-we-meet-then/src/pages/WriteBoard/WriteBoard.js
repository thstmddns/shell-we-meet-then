import React,{useState} from 'react'
import { useParams, useNavigate } from  "react-router-dom";
import axios from 'axios';

function WriteBoard() {


    const [content, setContent] = useState('');
    const {groupSeq} = useParams();
    const navigate = useNavigate();




    const addArticle = () => {
        let form = new FormData();
        const imgs = document.getElementById('img').files;
        const videoFile = document.getElementById('video').files[0];
        form.append('content', content)
        form.append('image', imgs)
        form.append('video', videoFile)
        form.append('groupSeq', groupSeq)
        axios
        .post('/boards', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(navigate('/main'))
    }


    





  return (
    <div>
        <textarea value={content}
        onChange={(e) => { setContent(e.target.value) }} />
        <br />
        <h1>사진</h1>
        <input type='file' id='img' multiple />
        <br />
        <h1>동영상</h1>
        <input type='file' id='video'/>
        <br />
        <button onClick={addArticle}>글 쓰기</button>


    </div>
  )
}

export default WriteBoard