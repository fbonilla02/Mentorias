
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

export default function MonitoresForm(props) {
    const initialValues = {
        nombre:'',
        apellido:'',
        programa:'',
        semestre:'',
        cedula:'',
        correo:''
        
    };
    const [valueform, setValuesform] = useState(initialValues)

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setValuesform({...valueform, [name]:value})
       
    }
    const handleSubmit = e =>{
        e.preventDefault()
        
        props.addMonitor(valueform)
        setValuesform({...initialValues})
    }
    const getById = async (id)=>{
        const docx = await getDoc(doc(db, "monitores", id));
        setValuesform({...docx.data()})

    }

    useEffect(()=>{
        if(props.currentId === ''){
            setValuesform({...initialValues})
        } else{
            getById(props.currentId)
        }
    }, [props.currentId])
  return (
    <div className='w-full max-w-xs m-auto my-10 bg-white rounded'>
    <form onSubmit={handleSubmit} className='flex flex-col px-5'>
    <h4 className='text-2xl text-center pb-5 pt-2'>Formulario Monitores</h4>
    <div className='mb-4'>
        <label  htmlFor='nombre' >Nombre</label>
        <input type='text' onChange={handleInputChange} value={valueform.nombre} name='nombre' placeholder='Ej: Francisco'   className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='apellido' >Apellido</label>
        <input type='text' onChange={handleInputChange} value={valueform.apellido}  name='apellido' placeholder='Ej: Bonilla' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='programa' >Programa Academico</label>
        <input type='text' onChange={handleInputChange} value={valueform.programa}   name='programa' placeholder='Ej: Desarrollo de software' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='semestre' >Semestre</label>
        <input type='number' onChange={handleInputChange} value={valueform.semestre}  name='semestre' placeholder='Ej: 5' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='cedula' >Cedula</label>
        <input type='number' onChange={handleInputChange} value={valueform.cedula}  name='cedula' placeholder='Ej: 12315107892' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='correo'  >correo de contacto</label>
        <input type='email' onChange={handleInputChange} value={valueform.correo}   name='correo' placeholder='Ej: pachito@mail.dev' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='flex  justify-center gap-3 p-5'>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>{props.currentId === ''? 'Guardar' : 'Actualizar'}</button>

    </div>
    </form>
    </div>
  )
}
