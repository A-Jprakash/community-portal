import React from 'react';
import { Link } from 'react-router-dom';

const CardsSection = () => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('user') !== null;

  // Define the cards with conditional links based on login status
  const cards = [
    {
      title: 'File a Complaint',
      description: 'Report civic issues in your area.',
      icon: '📄',
      link: isLoggedIn ? '/complaint' : '/login', // Conditionally set the link
    },
    {
      title: 'Upvote Complaints',
      description: 'Support pressing issues in your community.',
      icon: '👍',
      link: isLoggedIn ? '/upvote' : '/login', // Conditionally set the link
    },
    {
      title: 'Track Complaints',
      description: 'Stay updated on complaint statuses.',
      icon: '📊',
      link: isLoggedIn ? '/mycomplaints' : '/login', // Conditionally set the link
    },
  ];

  return (
    <div className="p-8 w-full h-full bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Explore Features
      </h2>
      <div className="flex justify-center align-center space-x-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            <div className="text-5xl">{card.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.description}</p>
            <Link
              to={card.link}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
