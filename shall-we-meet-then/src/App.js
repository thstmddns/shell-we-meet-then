import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoUploader from './pages/WriteBoard/VideoUploader';

import {

  Home, 
  CreateGroup,
  NewPassword,
  FindPassword,
  Quiz,
  MemoryList,
  Memory,
  Main,
  Statistics,
  WriteBoard

} from './pages/index'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/group/create' element={<CreateGroup />} />
          <Route path='/find-password' element={<FindPassword />} />
          <Route path='/new-password/:uuid'  element={<NewPassword />} />
          <Route path='/main'  element={<Main />} />
          <Route path='/group/quiz/:groupSeq' element={<Quiz />} />
          <Route path='/group/memory/:groupSeq' element={<MemoryList />} />
          {/* <Route path='/group/memory/:groupSeq/:articleSeq' element={<Memory />} /> */}
          <Route path='/group/statistics/:groupSeq' element={<Statistics />} />
          <Route path='/group/article/create/:groupSeq' element={<WriteBoard />} />
            
          <Route path='/video' element={<VideoUploader />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
