'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function login (){
    const [message, setMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        if(window.localStorage.getItem('user') !== undefined && window.localStorage.getItem('user'))
          router.push('/')
    }, [])
  
    const handlerSubmit = (e) => {
      e.preventDefault()
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const data = {email: email, password: password}
  
      fetch('http://192.168.100.122:8080/api/login', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json()).then(result => {
        document.getElementById('password').value = ''
        document.getElementById('email').value = ''
        
        if(result.message === 'success'){
            localStorage.setItem('user', JSON.stringify(result.data))
            router.push('/')
        }
        else if(result.message === 'password is incorrect') setMessage('La contraseña no es correcta') 
        else setMessage('El correo electronico no esta registrado o no es valido')
      })
  
    }
  
    return (
      <div>
        <form className='mx-auto w-1/3 border rounded-lg mt-10 px-5 py-10 shadow-md' onSubmit={handlerSubmit}>
          <h1 className='text-center text-3xl my-10 font-semibold'>Login</h1>
          <input id='email' placeholder='email' type="email" className='w-full py-1 px-4 rounded rounded-lg text-gray-200 bg-transparent border mb-2' required />
          <input id='password' placeholder='password' type="password" className='w-full py-1 px-4 rounded rounded-lg text-gray-200 bg-transparent border my-2' required />
          <button className='mt-10 mb-5 text-center border w-full py-1 bg-indigo-400 rounded-lg border-indigo-400 hover:bg-indigo-500'>Entrar</button>
          <Link href='/signin' className='py-1 block w-full text-center text-gray-200 hover:text-gray-300 hover:bg-gray-900 rounded-lg'>Sing in</Link>
        </form> 
      </div>
    )
}