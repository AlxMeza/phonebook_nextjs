import { api_url } from "@/app/helpers"

export default function AddContact ( {user, setTrigger, showToast} ) {
    const handlerSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value
        const lastname = document.getElementById('lastname').value
        const phone = document.getElementById('phone').value
        const email = document.getElementById('email').value
        const data = {users_key: user.id, name: name, lastname: lastname, phone: phone, email: email}

        fetch(`${api_url}/contact`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            result.message === 'contact created succesfully' ? showToast('success', 'Success', 'Contact created successfully') 
            : showToast('error', 'Error', 'Contact cannot be created')
            setTrigger(true)
            document.getElementById('name').value = ''
            document.getElementById('lastname').value = ''
            document.getElementById('phone').value = ''
            document.getElementById('email').value = ''
        })
    }

    return(
        <> 
            <form onSubmit={handlerSubmit} className="mx-5 border border-gray-500 rounded rounded-lg px-5 py-10">
                <h2 className="text-xl text-center font-semibold mb-10">Add contact</h2>
                <input id='name' type="text" placeholder="Name" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='lastname' type="text" placeholder="Lastname" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='phone' type="tel" placeholder="phone" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />
                <input id='email' type="email" placeholder="email" className="border border-gray-500 py-1 px-4 rounded rounded-lg w-full bg-transparent mb-4" required />

                <button className="text-center w-full py-1 border border-indigo-400 bg-indigo-400 rounded-lg my-10 hover:bg-indigo-500">Create Contact</button>
            </form>
        </>
    )
}