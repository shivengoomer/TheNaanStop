import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import the CSS file for styling
import { useNavigate} from 'react-router-dom';
const User = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
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
      const response = await axios.post('http://localhost:3001/users', userData);
      setMessage('User registered successfully');
      console.log(response.data);
      setUserData({ name: '', email: '', password: '', avatar: '' }); // Reset form fields
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
      const response = await axios.post('http://localhost:3001/users/login', {
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

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {isRegister && (
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={userData.avatar}
            onChange={handleChange}
          />
        )}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-form">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>

      <h2>Registered Users</h2>
      <button onClick={fetchUsers}>Fetch Users</button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <h3>{user.name} ({user.role})</h3>
              <p>Email: {user.email}</p>
              {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} style={{ width: '50px', borderRadius: '50%' }} />}
              <p>Registered on: {new Date(user.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
