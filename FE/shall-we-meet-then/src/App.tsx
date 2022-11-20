import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./NavigationGuard/PublicRoute";
import PrivateRoute from "./NavigationGuard/PrivateRoute";
import "./App.css"
import NotFound from "./pages/NotFound";
import IsGroup from './NavigationGuard/isGroup'
import IsAgree from './NavigationGuard/isAgree'

import {

  Home, 
  CreateGroup,
  NewPassword,
  FindPassword,
  Quiz,
  MemoryList,
  Main,
  WriteBoard

} from './pages/index'



function App() {
  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      <Router>
        <Routes>
        <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
          <Route path='/group/create' element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
          <Route path='/find-password' element={<PublicRoute><FindPassword /></PublicRoute>} />
          <Route path='/new-password/:uuid'  element={<PublicRoute><NewPassword /></PublicRoute>} />
          <Route path='/main'  element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path='/group/quiz/:groupSeq' element={<PrivateRoute><IsGroup><IsAgree><Quiz /></IsAgree></IsGroup></PrivateRoute>} />
          <Route path='/group/memory/:groupSeq' element={<PrivateRoute><IsGroup><IsAgree><MemoryList /></IsAgree></IsGroup></PrivateRoute>} />
          <Route path='/group/article/create/:groupSeq' element={<PrivateRoute><IsGroup><WriteBoard /></IsGroup></PrivateRoute>} />
          <Route path='/*' element={<NotFound />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
