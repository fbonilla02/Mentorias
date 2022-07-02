import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './components/Register';
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path='/'  element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
       }/>
      <Route path='/login'  element={<Login/> }/>
      <Route path='/register'  element={<Register/> }/>
    </Routes>
    </AuthProvider>
  );
}

export default App;
