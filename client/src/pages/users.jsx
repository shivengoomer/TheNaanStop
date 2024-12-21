import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import the CSS file for styling
import { useNavigate} from 'react-router-dom';

const User = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(true); // Track if the user is registering or logging in
  const navigate=useNavigate()
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://thenaanstop.onrender.com/users', userData);
      setMessage('User registered successfully');
      console.log(response.data);
      setUserData({ name: '', email: '', password: '' }); // Reset form fields
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Error registering user. Please try again.');
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = userData; // Only send email and password
      const response = await axios.post('https://thenaanstop.onrender.com/users/login', {
        email,
        password,
      });
      setMessage('Login successful!');
      console.log(response.data);
      setTimeout(() => {
        navigate('/');}, 2000);
      // You can store the user info or token in local storage here if needed
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className='background'>
    <div className="user-container">
      <h1>{isRegister ? 'User Registration' : 'User Login'}</h1>
      <form onSubmit={isRegister ? handleRegister : handleLogin}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-form">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>  
    </div>
    </div>
  );
};

export default User;
