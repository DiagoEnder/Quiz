import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParentAuth from './components/auth/ParentAuth';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<ParentAuth />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
