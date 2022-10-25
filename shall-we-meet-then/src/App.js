import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";

import {
  Home, 
  Farm,
  CreateGroup,
  GroupTree,
  Quiz,
  MemoryList,
  Memory
} from './pages/index'



function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/farm' element={<Farm />} />
          <Route path='/group/create' element={<CreateGroup />} />
          <Route path='/group/tree/:groupSeq' element={<GroupTree />} />
          <Route path='/group/quiz/:groupSeq' element={<Quiz />} />
          <Route path='/group/memory/:groupSeq' element={<MemoryList />} />
          <Route path='/group/memory/:groupSeq/:articleSeq' element={<Memory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
