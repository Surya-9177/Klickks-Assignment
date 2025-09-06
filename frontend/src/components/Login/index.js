import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import './index.css'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        navigate('/profile')
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
    }

    const onSubmitFailure = errorMsg => {
        setErrMsg(errorMsg)
        console.log(errorMsg)
    }

    const makeApiCall = async (e) => {
        e.preventDefault()
        try {
            if (username.length !== 0 && password.length !== 0) {
                const url = "http://localhost:8000/login"
                const userDetails = { username, password }
                const opt = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userDetails)
                }

                const response = await fetch(url, opt)
                const data = await response.json()
                console.log(response)
                console.log(data.jwtToken)
                if (response.ok) {
                    onSubmitSuccess(data.jwt_token)
                } else {
                    onSubmitFailure(data.error)
                }
            } else {
                onSubmitFailure("please enter the details!!!")
            }
        } catch (e) {
            onSubmitFailure("Something went wrong, please try again later.")
        }
    }

    return (
        <div className="login-bg-con">
            <h1 className="text-success text-center">WELCOME TO THE LOGIN PAGE</h1>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <form onSubmit={makeApiCall} className='login-form'>
                    <label htmlFor='username' className='m-2'>USERNAME</label>
                    <br />
                    <input className='m-2' id="username" type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor='password' className='m-2'>PASSWORD</label>
                    <br />
                    <input type='password' className='m-2' id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <br />
                    <button type='submit' className='btn btn-info m-2 text-white'>Login</button>
                    {errorMsg ? <p className='text-danger text-center'>{errorMsg}</p> : ""}
                </form>
            </div>
        </div>
    )
}
export default Login