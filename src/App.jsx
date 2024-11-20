
import { Navigate, Route, Routes ,useLocation } from 'react-router-dom';
import './App.css'
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import ClientDashboard from './views/ClientDashboard/ClientDashboard';
import Login from './views/Login/Login'
import PolicyForm from './components/AdminComponents/Policy/PolicyForm/PolicyForm';
import NavBar from './components/NavBar/NavBar';
import PolicyDetail from './components/AdminComponents/Policy/PolicyDetail/PolicyDetail';
import ClientList from './components/AdminComponents/Client/ClientList/ClientList';
import CreateUser from './components/AdminComponents/Client/CreateUser/CreateUser';
import { ToastContainer } from 'react-toastify';

function App() {
  const userRole=localStorage.getItem("userRole");
  const location = useLocation();
  return (


    <div className="bg-gray-200 min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
      {location.pathname !== "/" && <NavBar />}
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
      <Route path='/admin-dashboard/createPolicy' element= {<PolicyForm/>}/>
      <Route path='/admin-dashboard-detail/:id' element={<PolicyDetail/>}/>
      <Route path='/admin-dashboard/clients' element={<ClientList/>}/>

      
      <Route path='/client-dashboard' element= {<ClientDashboard/>}/>
        <Route path= '/client-dashboard' element={<CreateUser/>}/>
     </Routes>
    </div>
  )
}

export default App
