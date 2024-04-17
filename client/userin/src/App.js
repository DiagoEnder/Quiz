import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParentAuth from './components/auth/ParentAuth';
import Home from './components/user/home/Home';
import { useAuth } from './components/context/AuthContext';
function App() {
  const { isLogin } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={isLogin ? <Home /> : <ParentAuth />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
