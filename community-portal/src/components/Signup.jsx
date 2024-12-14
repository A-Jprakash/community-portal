import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contactNumber: ''
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
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.contactNumber,
      };

      try {
        const response = await axios.post('http://localhost:9090/user/register', userData);

        if (response.status === 200) {
          // Successful registration
          setMessage(response.data); // "User registered successfully"
          setMessageType('success');
          setTimeout(() => {
            window.location.href = '/login'; // Redirect after 2 seconds
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // User already exists
          setMessage(error.response.data); // "User already exists"
          setMessageType('error');
        } else {
          // Other errors
          setMessage('An unexpected error occurred. Please try again.');
          setMessageType('error');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

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

        <div>
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Up
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
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600">Login here</Link>
      </p>
    </div>
  );
};

export default SignUp;
