import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'

export default function NavBar () {
    const router = useRouter();

    return(
        <>
            <Menubar start={ <span className='text-lg'><i className='pi pi-phone mx-4' style={{fontSize: '1.5rem'}}></i>Phonebook</span> } 
            end={<Button label="Logout" icon="pi pi-power-off" className='p-button-text mx-5' onClick={() => {
                localStorage.clear()
                router.push('/login')
            }}/>}/>
        </>
    )
}