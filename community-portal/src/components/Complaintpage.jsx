import React, { useState } from 'react';
import axios from 'axios';

const ComplaintPage = () => {
  const [complaintType, setComplaintType] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const complaintData = {
      userId,
      complaintType,
      image,
      description,
      contactNumber,
      status: 'Pending',
      upvote: 0,
      downvote: 0,
    };

    try {
      console.log('Complaint data:', complaintData);
      const response = await axios.post('http://localhost:9090/complaint/register', complaintData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setFormSubmitted(true);
      setMessageType('success');
      setMessage('Complaint submitted successfully!');
      setResponseData(response.data); // Save response data
      console.log('Complaint submitted:', response.data);
      // Redirect after login
      setTimeout(() => {
        window.location.href = '/complaint'; // Redirect to the dashboard or homepage
      }, 4000);
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to submit complaint, please try again.');
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-md shadow-md max-w-xl">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Submit Your Complaint</h1>

      {message && (
        <div
          className={`p-4 rounded-md mb-4 text-center ${
            messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      {responseData && (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold">Complaint Details</h2>
          <p><strong>ID:</strong> {responseData}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Complaint Type */}
        <div>
          <label htmlFor="complaintType" className="block text-lg font-medium text-gray-700">Complaint Type</label>
          <select
            id="complaintType"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a Category</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Pothole">Pothole</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Upload an Image (Optional)</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Provide detailed description of the issue."
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNumber" className="block text-lg font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintPage;
