import React, { useState, useEffect } from 'react';

// TrackProgress Component
const TrackProgress = ({ complaint }) => {
  const [status, setStatus] = useState(complaint.status);
  const [progress, setProgress] = useState(complaint.progress);
  const [actions, setActions] = useState(complaint.actions);

  const progressStyles = {
    'Pending': 'bg-gray-200',
    'In Progress': 'bg-yellow-500',
    'Completed': 'bg-green-500',
  };

  useEffect(() => {
    // Simulate fetching data from backend
    // Update the progress dynamically (e.g., from backend)
    setStatus(complaint.status);
    setProgress(complaint.progress);
    setActions(complaint.actions);
  }, [complaint]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg my-6">
      {/* Complaint Title and Description */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{complaint.title}</h2>
        <p className="text-lg text-gray-700">{complaint.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Pending</span>
          <span>In Progress</span>
          <span>Completed</span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
          <div
            className={`h-2 rounded-full ${progressStyles[status]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800">Status: {status}</h3>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Timeline</h3>
        <div className="mt-4 space-y-6">
          {actions.map((action, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-4 h-4 rounded-full ${index <= Math.floor(progress / 33) ? 'bg-green-500' : 'bg-gray-400'}`}
                />
              </div>
              <div>
                <p className="text-gray-700">{action.description}</p>
                <span className="text-sm text-gray-500">{action.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6">
        <img
          src={complaint.imageUrl}
          alt="Complaint related"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

// Trackprogress Component to simulate backend data
const Trackprogress = () => {
  const complaintData = {
    title: 'Broken Streetlight on Elm Street',
    description: 'The streetlight at the corner of Elm Street and Maple Avenue is not working.',
    status: 'In Progress', // This will come from backend (e.g., Pending, In Progress, Completed)
    progress: 50, // Progress percentage (0-100)
    actions: [
      {
        description: 'Complaint filed by user.',
        timestamp: '2 hours ago',
      },
      {
        description: 'Complaint reviewed by local authorities.',
        timestamp: '1 hour ago',
      },
      {
        description: 'Scheduled for repair.',
        timestamp: 'Just now',
      },
    ],
    imageUrl: 'https://via.placeholder.com/600x400?text=Streetlight+Issue', // Sample image URL
  };

  return (
    <div className="container mx-auto p-6">
      <TrackProgress complaint={complaintData} />
    </div>
  );
};

export default Trackprogress;
