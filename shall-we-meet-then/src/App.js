import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Home  from './pages/Home/Home.js';
import  Farm  from './pages/Farm/Farm.js';
import  CreateGroup  from './pages/CreateGroup.js';
import  GroupTree  from './pages/GroupTree.js';
import  Quiz  from './pages/Quiz.js';
import  MemoryList  from './pages/MemoryList.js';
import  Memory  from './pages/Memory.js';



function App() {
  return (
    <div className="App">
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
