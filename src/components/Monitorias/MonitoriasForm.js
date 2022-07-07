
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, {  useEffect, useState } from 'react'
import { db } from '../../firebase';


export default function MonitoriasForm(props) {
    const initialValues = {
        materia:'',
        monitor:'',
        fecha:'',
        salon:'',
        
    };
    const [valueform, setValuesform] = useState(initialValues)
    const [monitxr, setMonitxr] = useState([])

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setValuesform({...valueform, [name]:value})
       
    }
    const handleSubmit = e =>{
        e.preventDefault()
        console.log(valueform);
        props.addMonitoria(valueform)
        setValuesform({...initialValues})
    }
    const getById = async (id)=>{
        const docx = await getDoc(doc(db, "monitoria", id));
        setValuesform({...docx.data()})

    }
    const getMonitr = async ()=>{
        const queryaSnapshot = await getDocs(collection(db, 'monitores'))
        const docu = [];
        queryaSnapshot.forEach((doc) =>{
            docu.push({...doc.data()})
        })
        setMonitxr(docu)
    }

    useEffect(() => {
        if(props.currentId ===''){
            setValuesform({...initialValues})
        }else{
            getById(props.currentId)
        }
        getMonitr()
    }, [props.currentId])

return (
    <div className='w-full max-w-xs m-auto my-10 bg-white rounded'>
    <form onSubmit={handleSubmit} className='flex flex-col px-5'>
    <h4 className='text-2xl text-center pb-5 pt-2'>Formulario Monitorias</h4>
    <div className='mb-4'>
        <label  htmlFor='materia'>materia</label>
        <input type='text' onChange={handleInputChange} value={valueform.materia} name='materia' placeholder='Ej: Fisica'   className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='monitor' >monitor</label>
        <select onChange={handleInputChange} value={valueform.monitor} name='monitor' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
        <option  value='defaultValue'>default</option>
        {monitxr.map(data =>(
            <option key={data.nombre} value={data.nombre} > {data.nombre}</option>
            
        )) }
        </select>
    </div>
    <div className='mb-4'>
        <label  htmlFor='fecha' >Programa Academico</label>
        <input type='date' onChange={handleInputChange} value={valueform.fecha}   name='fecha' placeholder='Ej: date' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='mb-4'>
        <label  htmlFor='salon' >salon</label>
        <input type='text' onChange={handleInputChange} value={valueform.salon}  name='salon' placeholder='Ej: 501' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
    </div>
    <div className='flex  justify-center gap-3 p-5'>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>{props.currentId === '' ? 'Guardar' : 'Actualizar'}</button>

    </div>
    </form>
    </div>
  )
}
