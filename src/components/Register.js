import React, { useState } from 'react'
import { useAuth} from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
import Alert from './Alert'
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
    <div className='w-full max-w-xs m-auto bg-white rounded'>
    <div>
        {error && <Alert message={error}/>}
    </div>
        <form className='flex flex-col px-5' onSubmit={handleSubmit}>
        <h2 className='text-2xl text-center pb-5 pt-5'>Register</h2>
            <div className="mb-4">
            <label htmlFor='email'>Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='email' name='email' placeholder='youremail@compania.dev' onChange={handleChange}/>
            </div>
            <div className="mb-4">
            <label htmlFor='password'>Password</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' placeholder='*********'  onChange={handleChange}/>
            </div>
            <div className='flex  justify-center gap-3 p-5 '>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Register</button>
            </div>
        </form>
        <div className='text-center py-2'>
            <a href='/login'>Alredy have an account? <span className='text-blue-700'>Sign up</span></a>
        </div>
    </div>
  )
}
