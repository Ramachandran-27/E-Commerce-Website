import { useState } from 'react'
import { registerUser } from '../../services/userService';
import './Register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  });

  const [error,setError] = useState('');

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData(prev => (
      {
        ...prev,
        [name]:value
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(`Username:${formData.name} Email : ${formData.email}\nPassword : ${formData.password}`);
      try{
        const response = await registerUser(formData);
        console.log(response);
        if(response.success){
          navigate('/');
        }
      }
      catch(err){
        setError(err.message);
      }
    };
  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} >
          <label htmlFor='name'>Username:</label>
          <input id='name' type='text' name='name' value={formData.name} onChange={handleChange}/>
          <label htmlFor='email'>Email ID:</label>
          <input id='email' type='email' name='email' value={formData.email} onChange={handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={formData.password} onChange={handleChange} />
          <button type='submit'>Register</button>
        </form>
        <p>{error || ''}</p>
      </div>

    </div>
  )
}
