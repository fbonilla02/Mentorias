import React from 'react'
import { useAuth } from '../context/AuthContext'


export default function Home() {
    const {user, logout, loading} = useAuth()

const handleLogout = async() =>{
   await logout()
}
if (loading) return <h1>loading</h1>
  return (
    <div>
    <h1>welcome { user.displayName || user.email } <button onClick={handleLogout}>logout</button></h1>
    </div>
  )
}
