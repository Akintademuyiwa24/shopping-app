import {Navigate, Outlet} from 'react-router-dom'

const RequireAuth = () => {

    const isLoggedIn = localStorage.getItem('user') === 'true';
    return (
        <>

            {isLoggedIn ? <Outlet/> : <Navigate to="/login" replace/>}
        
        </>
    )

}

export default RequireAuth