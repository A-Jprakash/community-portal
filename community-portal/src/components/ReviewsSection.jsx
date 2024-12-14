import React from 'react';

const ReviewsSection = () => {
  const reviews = [
    { name: 'John Doe', review: 'A great platform for raising civic issues.' },
    { name: 'Jane Smith', review: 'User-friendly and highly impactful!' },
    { name: 'Robert Brown', review: 'Efficient way to engage with the community.' },
  ];

  return (
    <div className="p-8 bg-blue-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        User Reviews
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 text-center"
          >
            <p className="text-lg italic">"{review.review}"</p>
            <h4 className="mt-4 font-semibold">{review.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
