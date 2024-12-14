import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); // For success or error messages
  const [messageType, setMessageType] = useState(''); // To style messages (success or error)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      try {
        console.log('Login data:', loginData);
        const response = await axios.post('http://localhost:9090/user/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Successful login
          setMessage('Login successful!');
          setMessageType('success');
          console.log('Login successful:', response.data);

          // Store user info or token if needed
          localStorage.setItem('user', JSON.stringify(response.data));

          // Redirect after login
          if(response.data.role === 'admin') {
            setTimeout(() => {
              window.location.href = '/update';
            }, 2000);
          } else {
            setTimeout(() => {
              window.location.href = '/complaint';
            }, 2000);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Invalid credentials
          setMessage('Invalid username or password.');
          setMessageType('error');
        } else {
          // Other errors
          setMessage('An unexpected error occurred. Please try again.');
          setMessageType('error');
        }
        console.error('Login failed:', error.response ? error.response.data : error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        {/* Display the message below the submit button */}
        {message && (
          <div
            className={`mt-4 p-2 rounded-md ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </form>
      <p className="text-center text-gray-700 mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
