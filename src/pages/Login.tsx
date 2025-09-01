import {useNavigate} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    function handleLogin() {
        localStorage.setItem('user', 'true')
        navigate('/dashboard')
    }
  return (
    <div>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login