import { useState } from 'react';
import {loginUser} from '../../services/userService';
import {useNavigate} from 'react-router-dom';
import './Login.css';

export default function Login() {

  const [formData,setFormData] = useState({
    email:'',
    password:''
  });

  const [error,setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:value 
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Email : ${formData.email}\nPassword : ${formData.password}`);
    try{
      const response = await loginUser(formData);
      console.log(response);
      if(response.success){
        navigate('/');
      }
    }
    catch(err){
      setError(err.message);
    }
  }
  return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' value={formData.email} type='email' onChange={handleChange}/>
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' value={formData.password} type='password' onChange={handleChange}/>
        <input type='submit' value="Login" />
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  </div>
  )
}
