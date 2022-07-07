import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home';
import { Login } from '../components/Login';
import Navbar from '../components/Navbar';
import { ProtectedRoute } from './ProtectedRoute';
import { Register } from '../components/Register';
import {AuthProvider} from '../context/AuthContext'
import Monitores from '../components/Monitores/Monitores';
import Monitorias from '../components/Monitorias/Monitorias';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="bg-slate-300 text-black h-screen " >
    <AuthProvider>
      <Routes>
      <Route path='/*'  element={
        <ProtectedRoute>
        <Navbar/>
          <Home/>
          
        </ProtectedRoute>
       }/>
       <Route path='/monitorias' element={
        <ProtectedRoute>
        <Navbar/>
          <Monitorias/>
        </ProtectedRoute>
       } />
       <Route path='/monitores' element={
        <ProtectedRoute>
        <Navbar/>
           <Monitores/>
        </ProtectedRoute>
       } />
      <Route path='/login'  element={<Login/> }/>
      <Route path='/register'  element={<Register/> }/>
    </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
