import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintCard = ({ complaint }) => {
  const [upvotes, setUpvotes] = useState(complaint.upvote);
  const [downvotes, setDownvotes] = useState(complaint.downvote);
  const [errorMessage, setErrorMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleUpvote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9090/complaint/upvote/${complaint.id}/${user.id}`
      );
      setUpvotes(response.data);
    } catch (error) {
      console.error('Error during upvote:', error);
      setErrorMessage('Failed to update upvotes. Please try again.');
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9090/complaint/downvote/${complaint.id}/${user.id}`
      );
      setDownvotes(response.data);
    } catch (error) {
      console.error('Error during downvote:', error);
      setErrorMessage('Failed to update downvotes. Please try again.');
    }
  };

  return (
    <div className="max-w-lg flex flex-col mx-auto bg-white p-6 rounded-lg shadow-md my-6">
      <h2 className="text-2xl font-semibold text-gray-900">{complaint.complaintType}</h2>
      <p className="text-gray-700 mt-4">{complaint.description}</p>

      <div className="mt-6">
        {complaint.image && (
          <img
          src={complaint.image} // Base64 data already includes the required prefix
          alt={complaint.complaintType}
          className="w-full h-64 object-cover rounded-md"
        />
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpvote}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Upvote ({upvotes})
          </button>
          <button
            onClick={handleDownvote}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Downvote ({downvotes})
          </button>
        </div>
        <span className="text-sm text-gray-500">{complaint.status}</span>
      </div>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

const UpvoteComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:9090/complaint/all');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError('Failed to fetch complaints. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="text-center">Loading complaints...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Upvote Complaints</h1>
      {complaints.length === 0 ? (
        <div className="text-center text-gray-600">No complaints found.</div>
      ) : (
        complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))
      )}
    </div>
  );
};

export default UpvoteComplaints;
