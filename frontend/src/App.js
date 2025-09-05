import { Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome';
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}
export default App;
