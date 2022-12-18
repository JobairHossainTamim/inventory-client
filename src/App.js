
import './App.css';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/antd.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Items from './Pages/Items/Items';
import Cart from './Pages/Cart/Cart';
import Bills from './Pages/Bills/Bills';
import Customers from './Pages/Customers/Customers';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import About from './Pages/About/About';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact  path='/home' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route exact  path='/about' element={<About/>}></Route>
          <Route exact  path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>}></Route>
          <Route exact  path='/cart' element={<ProtectedRoute><Cart></Cart></ProtectedRoute>}></Route>
          <Route exact  path='/bills' element={<ProtectedRoute><Bills /></ProtectedRoute>}></Route>
          <Route exact  path='/customers' element={<ProtectedRoute><Customers /></ProtectedRoute>}></Route>
          <Route exact  path='/reg' element={<ProtectedRoute><Registration></Registration></ProtectedRoute>}></Route>
          <Route exact  path='/login' element={<Login></Login>}></Route>
          <Route exact path='/' element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {

  if (localStorage.getItem('pos-user')) {
    return children
  }

  else {
    return <Navigate to='/login'></Navigate>
  }

}