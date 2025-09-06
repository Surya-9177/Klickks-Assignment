import Cookies from 'js-cookie'
import { replace } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom'
import './index.css'

const Profile = (props) => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const navigate = useNavigate()

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
        return <Navigate to = "/login" replace />
    }

    console.log(jwtToken)

    const makeLogoutCall = async () => {
        Cookies.remove('jwt_token')
        navigate('/login', {replace: true})
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }
    return (
        <div>
            <h1 className='text-capitalize'>Welcome to the Profile page</h1>
            <div>
                <h1>Your personal details are</h1>
                <ul>
                    <li>{username}</li>
                    <li>{password}</li>
                </ul>
            </div>
            <button onClick={makeLogoutCall} className='btn btn-danger'>Logout</button>
        </div>
    )
}
export default Profile