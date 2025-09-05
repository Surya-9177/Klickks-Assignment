import { Link } from "react-router-dom"
import './index.css'

const Welcome = () => {
  return (
    <div className="bg-con">
      <h1 className="text-success text-center">Welcome! Please login if you already have an account, or register to create a new one and get started</h1>
      <div className="text-center">
        <Link to="/login"><button className="btn btn-primary m-5">Login</button></Link>
        <Link to="register" ><button className="btn btn-info m-5 text-light">Sign Up</button></Link>
      </div>
    </div>
  )
}
export default Welcome