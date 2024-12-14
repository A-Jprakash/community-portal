import React from 'react';
import community from '../assets/group.jpg';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-20 items-center bg-blue-100 w-full h-[500px] p-20">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-blue-900">
        Building Stronger Communities, One Complaint at a Time
        </h1>
        <p className="mt-4 text-md text-gray-700">
        Your voice matters! Report issues, upvote urgent concerns, and help make our community safer and cleaner. Ready to make a difference?
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <img
          src={community} // Ensure that the image path is correct
          alt="Community engagement"
          className="w-[500px] h-[400px] object-cover rounded-xl" // Additional styling for better image display
        />
      </div>
    </div>
  );
};

export default HeroSection;
