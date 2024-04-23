import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParentAuth from './components/auth/ParentAuth';
import { useAuth } from './components/context/AuthContext';
import HomeDashBoard from './components/user/dashboard/HomeDashBoard';
import HomeUser from './components/user/home/HomeUser';
import LayoutHome from './components/user/layout/LayoutHome';
import MainWaiting from './components/user/WaitingRoom/MainWaiting';
import Game from './components/user/game/Game';
import DetailQuiz from './components/user/dashboard/Quiz/DetailQuiz';
function App() {
  const { isLogin } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Navigate to="/home"/>}/>
          <Route path='/auth' element={isLogin ? <LayoutHome /> : <ParentAuth />}></Route>
          <Route path='/home' element={<LayoutHome />}>
            <Route index element={<HomeUser/>}/>
            <Route path='dashboard' element={<HomeDashBoard/>}></Route>
            <Route path='quiz/:id' element = {<DetailQuiz/>}/>
          </Route>
          <Route path='/waiting' element = {<MainWaiting/>}></Route>
          <Route path='/game' element = {<Game/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
