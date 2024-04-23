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
import LayoutHomeTest from './components/test/LayoutHomeTest';
import HomeUserTest from './components/test/HomeUserTest';
import GameTest from './components/test/GameTest';
import MainWaitingTest from './components/test/MainWaitingTest';
function App() {
  const { isLogin, isJoinRoom } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Navigate to={`${isJoinRoom ? "/waiting" : "/home"}`}/>}/>
          <Route path='/auth' element={isLogin ? <LayoutHome /> : <ParentAuth />}></Route>
          <Route path='/home' element={<LayoutHome />}>
            <Route index element={<HomeUser/>}/>
            <Route path='dashboard' element={<HomeDashBoard/>}></Route>
            <Route path='quiz/:id' element = {<DetailQuiz/>}/>
          </Route>
          {/* <Route path='/waiting' element = {isJoinRoom ? <MainWaiting/>: <Navigate to="/home"/>}></Route> */}
          <Route path='/waiting' element = { <MainWaiting/>}></Route>
          <Route path='/game' element = {<Game/>}></Route>
          

          <Route path='/hometest' element={<LayoutHomeTest />}>
            <Route index element={<HomeUserTest/>}/>
            <Route path='dashboardtest' element={<HomeDashBoard/>}></Route>
            <Route path='quiz/:id' element = {<DetailQuiz/>}/>
          </Route>
          {/* <Route path='/waiting' element = {isJoinRoom ? <MainWaiting/>: <Navigate to="/home"/>}></Route> */}
          <Route path='/waitingtest' element = { <MainWaitingTest/>}></Route>
          <Route path='/gametest' element = {<GameTest/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
