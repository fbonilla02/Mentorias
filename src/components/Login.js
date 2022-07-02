import React, { useState } from 'react'
import { useAuth} from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
import Alert from './Alert'
export  function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {login, loginWithGoogle} = useAuth()
    const navigate = useNavigate()
    const[error, setError] = useState()

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value})
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            setError(error.message)
            //if(error.code === "auth/internal-error"){
              //  setError('Correo invalido')
            //}
        }

    }
    const handleGoogleSignin = async()=>{
       try {
        await loginWithGoogle()
        navigate('/')
       } catch (error) {
        setError(error.message)
       }
    }
  return (
    <div className='w-full max-w-xs m-auto'>

        {error && <Alert message={error}/>}
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input  type='email' name='email' placeholder='youremail@compania.dev' onChange={handleChange}/>
            <label htmlFor='password'>Password</label>
            <input  type='password' name='password' placeholder='*********'  onChange={handleChange}/>
            <button>Login</button>
        </form>
        <div>
            <button onClick={handleGoogleSignin}>Google</button>
        </div>
    </div>
  )
}
