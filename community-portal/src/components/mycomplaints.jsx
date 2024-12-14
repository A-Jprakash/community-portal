import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/complaint/user/${user.id}`); // Replace with your API endpoint
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setErrorMessage('Failed to fetch complaints. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="text-center">Loading complaints...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">My Complaints</h1>

      {complaints.length === 0 ? (
        <div className="text-center text-gray-600">No complaints found.</div>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint.id} className="max-w-lg flex flex-col mx-auto bg-white p-6 rounded-lg shadow-md my-6">
            <h2 className="text-2xl font-semibold text-gray-900">{complaint.complaintType}</h2>
            <p className="text-gray-700 mt-4">{complaint.description}</p>
            
            <div className="mt-6">
              {complaint.image && (
                <img
                  src={complaint.image} // Base64 image string should include the proper data URI prefix
                  alt={complaint.complaintType}
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">{complaint.status}</span>
              <div className="flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                  disabled
                >
                  Upvote ({complaint.upvote})
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  disabled
                >
                  Downvote ({complaint.downvote})
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaints;
