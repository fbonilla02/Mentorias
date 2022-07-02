import React, { useState } from 'react'
import { useAuth} from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
export  function Register() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {signup} = useAuth()
    const navigate = useNavigate()
    const[error, setError] = useState()

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value})
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            await signup(user.email, user.password)
            navigate('/')
        } catch (error) {
            setError(error.message)
            //if(error.code === "auth/internal-error"){
              //  setError('Correo invalido')
            //}
        }

    } 
  return (
    <div>
    <div>
        {error && <p>{error}</p>}
    </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input  type='email' name='email' placeholder='youremail@compania.dev' onChange={handleChange}/>
            <label htmlFor='password'>Password</label>
            <input  type='password' name='password' placeholder='*********'  onChange={handleChange}/>
            <button>Register</button>
        </form>
    </div>
  )
}
