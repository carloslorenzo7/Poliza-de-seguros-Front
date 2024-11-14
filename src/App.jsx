
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import ClientDashboard from './views/ClientDashboard/ClientDashboard';
import Login from './views/Login/Login'

function App() {
  const userRole=localStorage.getItem("userRole");

  return (
    <>
     <Routes>
       <Route path= '/' element ={<Login/>}/>
     <Route
        path="/dashboard"
        element={
          userRole === 'ADMIN' ? (
            <Navigate to="/admin-dashboard" />
          ) : userRole === 'CLIENTE' ? (
            <Navigate to="/client-dashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/client-dashboard' element= {<ClientDashboard/>}/>

     </Routes>
    </>
  )
}

export default App
