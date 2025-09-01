import {useState} from 'react'

const Dashboard = () => {
    const [loginFormData, setLoginFormDate] = useState({name: "", email: ""})

    function handleChange(e) {
        const {name, value} = e.target
        setLoginFormDate((prev) => ({
            ...prev,
            [name] : value
        }))
    }
  return (
    <div>
        Welcome to the Dashboard
        <div>
            <form action="">
                <input type="text" name='name' id='name' value={loginFormData.name} onChange={handleChange} className='border border-amber-300'/>
                <input type="email" name="email" id="email" value={loginFormData.email} onChange={handleChange} className='border border-amber-300'/>

            </form>

            <p>{`My name is ${loginFormData.name} and my email is ${loginFormData.email}`}</p>
        </div>

    </div>
  )
}

export default Dashboard