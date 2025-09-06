import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import './index.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMsg, setErrMsg] = useState('')
    const [succesMsg, setSuccesMsg] = useState('')
    const navigate = useNavigate()

    const onSubmitSucces = (msg) => {
        setSuccesMsg(msg)
    }

    const onSubmitFailure = errorMsg => {
        setErrMsg(errorMsg)
    }

    const makeApiCall = async (e) => {
        e.preventDefault()
        try {
            if (confirmPassword === password) {
                const userDetails = { username, password }
                const url = "http://localhost:8000/register"
                const opt = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userDetails)
                }

                const response = await fetch(url, opt)
                const data = await response.json()
                if (response.ok) {
                    onSubmitSucces(data.message)
                } else {
                    onSubmitFailure(data.error)
                }
            }
        } catch {
            onSubmitFailure("Something went wrong, please try again later.")
        }
    }

    return (
        <div className="login-bg-con">
            <h1 className='text-center text-info'>WELCOME TO THE REGISTER PAGE</h1>
            <p className='text-center'>Please enter your details</p>
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
                    <label htmlFor='confirmPassword' className='m-2'>CONFIRM PASSWORD</label>
                    <br />
                    <input type='password' className='m-2' id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <br />
                    <button type='submit' className='btn btn-info m-2 text-white'>
                        Register
                    </button>
                    {errorMsg ? <p className='text-danger text-center'>{errorMsg}</p> : ""}
                    {succesMsg? <p className='text-success text-center'>{succesMsg}</p>: ""}
                </form>
            </div>
            {succesMsg? <Link to = "/login" className='text-center' style={{marginLeft: "45vw"}}><button className='btn btn-success m-2'>Go to Login Page</button></Link>: ""}
        </div >
    )
}
export default Register