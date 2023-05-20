'use client';
//theme
import "primereact/resources/themes/lara-dark-indigo/theme.css"     
//core
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css';

import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { api_url } from './helpers'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'
import { Toast } from 'primereact/toast'

import NavBar from "./components/NavBar"
import AddContact from "./components/AddContact"

export default function Home() {
  const router = useRouter()
  const toast = useRef(null)

  const [user, setUser] = useState({})
  const [contacts, setContacts] = useState([])
  const [trigger, setTrigger] = useState(false)
  const [filters] = useState({
    'name': { value: null, matchMode: FilterMatchMode.IN },
    'lastname': { value: null, matchMode: FilterMatchMode.IN },
    'phone': { value: null, matchMode: FilterMatchMode.IN },
    'email': { value: null, matchMode: FilterMatchMode.IN },
  })


  //Toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000});
  }

  useEffect(() => {
    if(window.localStorage.getItem('user') !== undefined && window.localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
      const usuario = JSON.parse(localStorage.getItem('user'))
      fetch(`${api_url}/contact/${usuario.id}`).then(res => res.json()).then(result => {
       result['status'] !== undefined ? setContacts([]) : setContacts(result)
      })
    }
    else 
      router.push('/login')
  }, [])

  useEffect(() => {
    if(trigger && Object.keys(user).length > 0){
      fetch(`${api_url}/contact/${user.id}`).then(res => res.json()).then(result => result['status'] !== undefined ? setContacts([]) : setContacts(result))
      setTrigger(false)
    }
  }, [trigger])

  //Templates
  const deleteBodyTemplate = (rowData) => {
    return <button className='rounded-full hover:bg-gray-700 px-2' onClick={(e) => {
      fetch(`${api_url}/deleteContact/${rowData.id}/${rowData.users_key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          result.status === 200 ? showToast('success', 'Success', 'Contact deleted succesfully') : showToast('error', 'Error', 'Contact cannot be deleted') 
          setTrigger(true)
        })
    }}>
        <i className='pi pi-eraser text-indigo-300 m-2'></i></button>
  }

  //Editor
  const lastnameEditor = (options) => {
    return <InputText type="text" placeholder='lastname' value={options.value} onChange={(e) => options.editorCallback(e.target.value)}
    style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  const nameEditor = (options) => {
    return <InputText type="text" placeholder='name' value={options.value} onChange={(e) => options.editorCallback(e.target.value)}
    style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  const phoneEditor = (options) => {
    return <InputText type="text" placeholder='phone' value={options.value} onChange={(e) => options.editorCallback(e.target.value)}
    style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  const emailEditor = (options) => {
    return <InputText type="text" placeholder='email' value={options.value} onChange={(e) => options.editorCallback(e.target.value)}
    style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  //Edit 
  const onRowEditComplete = (e) => {
    let updateData = e.newData
    let { id, users_key, name, lastname, email, phone} = updateData
    fetch(`${api_url}/modifyContact`, {
      method: 'POST',
      body: JSON.stringify({ id, users_key, name, lastname, email, phone })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        result.message === 'contact modified succesfully' ? showToast('success', 'Success', 'Contact update successfully') 
        : showToast('error', 'Error', 'Contact cannot be update')
        setTrigger(true)
      })
  }

  return (
    <div>
      <NavBar />
      <Toast ref={toast} />
      <section className="mx-10 my-20 lg:grid lg:grid-cols-2 gap-4">
        <aside>
          <DataTable value={contacts} responsiveLayout="scroll" size='small' editMode='row' dataKey='id' rows={20} scrollable style={{fontSize: '0.85rem'}} 
          onRowEditComplete={onRowEditComplete} removableSort>
              <Column header='Name' field='name' showFilterMenu={false} editor={(options) => nameEditor(options)} sortable/>
              <Column header='Lastname' field='lastname' showFilterMenu={false} editor={(options) => lastnameEditor(options)} sortable/>
              <Column header='Phone' field='phone' showFilterMenu={false} editor={(options) => phoneEditor(options)} sortable/>
              <Column header='Email' field='email' showFilterMenu={false} editor={(options) => emailEditor(options)} sortable/>
              <Column rowEditor header='Edit'></Column>
              <Column header='Delete' body={deleteBodyTemplate}></Column>
          </DataTable>
        </aside>
        <aside className="lg:mt-0 mt-4">
          <AddContact user={user} setTrigger={setTrigger} showToast={showToast} />
        </aside>
      </section>
    </div>
  )
}
