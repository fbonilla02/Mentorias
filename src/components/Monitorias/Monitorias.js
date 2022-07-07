import React, { useEffect, useState } from 'react'
import MonitoriasForm from './MonitoriasForm'
import { ToastContainer, toast } from 'react-toastify';
import { GrClose, GrEdit } from "react-icons/gr";
import 'react-toastify/dist/ReactToastify.css'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Monitorias() {
  const [monitoriasData, setMonitoriasData] = useState([])
  const [currentId, setCurrentId] = useState('')


  const addMonitoria = async(data)=>{
   if(currentId === ''){
    await addDoc(collection(db, 'monitoria'), data)
    toast('Nueva monitoria agregada', {
      type:'success'
    })
   }else{
    await updateDoc(doc(db, "monitoria", currentId), data)
    toast('Monitoria Actualizada', {
     type:'success'
   })
   setCurrentId('')
   }
  }

  const getMonitorias = async () =>{
    const q = query(collection(db, 'monitoria'))
    onSnapshot(q, (queryaSnapshot)=>{
      const docu = [];
      queryaSnapshot.forEach(element => {
        docu.push({...element.data(),id:element.id})
      });
      setMonitoriasData(docu)
    })
  }

  useEffect(()=>{
    getMonitorias()
  },[])

  const deleteData =  async(e) =>{
    if(window.confirm('esta seguro de eliminar')){
      await deleteDoc(doc(db, "monitoria", e));
      toast('Monitoria eliminado', {
        type:'error',
        autoClose:2000
      })
    }
}
  return (
    
    <div className='bg-slate-300 py-5'>
    <MonitoriasForm {...{addMonitoria, currentId, monitoriasData}}/>
    <div>
        {monitoriasData.map(data =>(
          <div key={data.id} className='relative max-w-xs m-auto my-2 p-5 bg-white rounded'>
          <i onClick={()=>{deleteData(data.id)} } className='text-orange-600'><GrClose className='absolute top-0 right-0 h-5 w-5 m-2 cursor-pointer text-orange-600' /></i>
          <i onClick={()=>{setCurrentId(data.id)}}> <GrEdit className='absolute bottom-0 right-0 h-5 w-5 m-2 cursor-pointer text-orange-600'/></i>
            <p><b>materia:</b> {data.materia} </p>
            <p><b>monitor:</b> {data.monitor}</p>
            <p><b>fecha:</b> {data.fecha}</p>
            <p><b>salon:</b> {data.salon}</p>
          </div>
        ))}
      </div>
    <ToastContainer />
    </div>
  )

}

