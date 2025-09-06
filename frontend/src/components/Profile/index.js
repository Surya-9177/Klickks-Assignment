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
        return <Navigate to="/login" replace />
    }

    console.log(jwtToken)

    const makeLogoutCall = async () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true })
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }
    return (
        <div style={{ height: "100vh", padding: "20px" }}>
            <h1 className='text-capitalize text-warning text-center'>Welcome to the Profile page</h1>
            <div className='d-flex flext-column justify-content-center'>
                <div style={{border: "1px solid black", padding: "20px", borderRadius: "12px", marginTop: "20vh"}}>
                    <p style={{ fontSize: "25px" }}>Your personal details are</p>
                    <br />
                    <ul>
                        <li>{username}</li>
                        <br />
                        <li>{password}</li>
                    </ul>
                    <button onClick={makeLogoutCall} className='btn btn-danger'>Logout</button>
                </div>
            </div>
        </div>
    )
}
export default Profile