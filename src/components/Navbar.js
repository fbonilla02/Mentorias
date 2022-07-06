import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const {logout} = useAuth()
    const handleLogout = async() =>{
        await logout()
     }
  return (

    <nav className='bg-zinc-800 flex text-white justify-between h-16 px-5 items-center'>
    <section>
    <Link to='/*'>Logo</Link>
    </section>
    <section>
        <ul className='flex gap-10'>
            <li><Link to='/monitores'> monitores</Link></li>
            <li><Link  to='/monitorias'>monitorias</Link></li>
        </ul>
    </section>
    <section>
    <button onClick={handleLogout}>logout</button>
    </section>
    </nav>
  )
}
