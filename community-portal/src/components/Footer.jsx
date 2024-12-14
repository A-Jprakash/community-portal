import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-blue-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Community Complaint Portal. All rights reserved.</p>
          <p>Made with ❤️ for a better community.</p>
          <div className="mt-4">
            <a href="/privacy" className="text-blue-300 hover:text-white mx-3">Privacy Policy</a>
            <a href="/terms" className="text-blue-300 hover:text-white mx-3">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  