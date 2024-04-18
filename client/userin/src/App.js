import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParentAuth from './components/auth/ParentAuth';
import { useAuth } from './components/context/AuthContext';
import HomeDashBoard from './components/user/dashboard/HomeDashBoard';
import HomeUser from './components/user/home/HomeUser';
import LayoutHome from './components/user/layout/LayoutHome';
import DetailQuiz from './components/user/dashboard/DetailQuiz';
function App() {
  const { isLogin } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={isLogin ? <LayoutHome /> : <ParentAuth />}></Route>
          <Route path='/home' element={<LayoutHome />}>
            <Route index element={<HomeUser/>}/>
            <Route path='dashboard' element={<HomeDashBoard/>}></Route>
            <Route path='quiz/:id' element = {<DetailQuiz/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
