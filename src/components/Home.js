import React from 'react'
import { useAuth } from '../context/AuthContext'


export default function Home() {
    const { loading} = useAuth()


if (loading) return <h1>loading</h1>
  return (
    <div>
   
    main
    </div>
  )
}
