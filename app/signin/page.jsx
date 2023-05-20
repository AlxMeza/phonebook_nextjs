'use client';

import { api_url } from '../helpers'
import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { Toast } from 'primereact/toast'
import Link from 'next/link'

export default function Signin () {
    const router = useRouter()
    const toast = useRef(null)

    useEffect(() => {
        if(window.localStorage.getItem('user') !== undefined && window.localStorage.getItem('user'))
          router.push('/')
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value
        const lastname = document.getElementById('lastname').value
        const phone = document.getElementById('phone').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const data = {name: name, lastname: lastname, phone: phone, email: email, password: password}

        fetch(`${api_url}/users`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            console.log(result)
            result.message === 'user created succesfully' ? showToast('success', 'Success', 'User created successfully') 
            : showToast('error', 'Error', 'Contact cannot be created')
            document.getElementById('name').value = ''
            document.getElementById('lastname').value = ''
            document.getElementById('phone').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            router.push('/login')
        })
    }

    //Toast
    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000});
    }

    return(
        <>
            <div>
            <Toast ref={toast} />
            <form onSubmit={handlerSubmit} className="border border-gray-500 rounded rounded-lg px-5 py-10 md:mx-auto mx-5 my-10 lg:w-1/3 md:w-1/2 w-full">
                <h2 className="text-3xl text-center font-semibold mb-10">Sign in</h2>
                <input id='name' type="text" placeholder="Name" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='lastname' type="text" placeholder="Lastname" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='email' type="email" placeholder="email" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='phone' type="tel" placeholder="phone" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='password' type="password" placeholder="password" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />

                <button className="text-center w-full py-1 border border-indigo-400 bg-indigo-400 rounded-lg my-10 hover:bg-indigo-500">Send</button>
                <Link href='/login' className='py-1 block w-full text-center text-gray-200 hover:text-gray-300 hover:bg-gray-900 rounded-lg mb-10'>Login</Link>
            </form>
            </div>
        </>
    )
}   