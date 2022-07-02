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
    <div className='w-full max-w-xs m-auto bg-white rounded'>

        {error && <Alert message={error}/>}
        <form className=' flex flex-col px-5' onSubmit={handleSubmit}>
            <h2 className='text-2xl text-center pb-5 pt-2'>Login</h2>
            <div className="mb-4">
            <label htmlFor='email'>Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  type='email' name='email' placeholder='youremail@compania.dev' onChange={handleChange}/>
            </div>
            <div className="mb-4">
            <label htmlFor='password'>Password</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' placeholder='*********'  onChange={handleChange}/>
            </div>
            <div className="flex items-center justify-between">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
            </div>
        </form>
        <div className='flex  justify-center gap-3 p-5 '>
      
            <button onClick={handleGoogleSignin}><img className='w-8 ' src='https://res.cloudinary.com/dixwwvzbt/image/upload/v1656783470/Logos/google_l4pkjf.png' alt='google'/></button>
            <button ><img className='w-8' src='https://res.cloudinary.com/dixwwvzbt/image/upload/v1656783472/Logos/facebook_w0wvji.png' alt='facebook'/></button>
        </div>
        <div className='text-center py-2'>
            <a href='/register'>Don't have an account? <span className='text-blue-700'>Sign up</span></a>
        </div>
    </div>
  )
}
