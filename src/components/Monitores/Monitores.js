import React, { useEffect, useState } from 'react'
import MonitoresForm from './MonitoresForm'
import { db } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { GrClose, GrEdit } from "react-icons/gr";
import {  toast } from 'react-toastify';

export default function Monitores() {
  const [monitoresData, setMonitoresData] = useState([])
  const [currentId, setCurrentId] = useState('')
  const addMonitor = async(data) =>{

    if (currentId === '') {
      await addDoc(collection(db, 'monitores'), data)
    toast('Nuevo monitor agregado', {
      type:'success'
    })
    }else{
     await updateDoc(doc(db, "monitores", currentId), data)
     toast('Nuevo monitor Actualizado', {
      type:'success'
    })
    setCurrentId('')
    }
  }
  const getMonitores = async () =>{
      const queryaSnapshot = await onSnapshot(getDocs(collection(db, "monitores")))
      const docu = [];
      queryaSnapshot.forEach(element => {
        docu.push({...element.data(),id:element.id})
      });
      setMonitoresData(docu)
  }


  useEffect(() => {
    getMonitores()
  }, [])
  const deleteData =  async(e) =>{
      if(window.confirm('esta seguro de eliminar')){
        await deleteDoc(doc(db, "monitores", e));
        toast('Monitor eliminado', {
          type:'error',
          autoClose:2000
        })
      }
  }
  return (
    <div className='bg-slate-300  py-5'>
      <MonitoresForm {...{addMonitor, currentId, monitoresData}}/>
      <div>
        {monitoresData.map(data =>(
          <div key={data.id} className='relative max-w-xs m-auto my-2 p-5 bg-white rounded'>
          <i onClick={()=>{deleteData(data.id)} } className='text-orange-600'><GrClose className='absolute top-0 right-0 h-5 w-5 m-2 cursor-pointer text-orange-600' /></i>
          <i onClick={()=>{setCurrentId(data.id)}}> <GrEdit className='absolute bottom-0 right-0 h-5 w-5 m-2 cursor-pointer text-orange-600'/></i>
            <p><b>Nombre:</b> {data.nombre} {data.apellido}</p>
            <p><b>Programa Academico:</b> {data.programa}</p>
            <p><b>Semestre:</b> {data.semestre}</p>
            <p><b>cedula:</b> {data.cedula}</p>
            <p><b>correo:</b> {data.correo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
