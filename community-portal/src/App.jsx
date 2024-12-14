import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import HeroSection from './components/HeroSection';
import CardsSection from './components/CardsSection';
import ReviewsSection from './components/ReviewsSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Complaint from './components/Complaintpage'; 
import Upvote from './components/UpvotesComplaint';
import Track from './components/Trackprogress';
import Signup from './components/Signup';
import Login from './components/Login';
import Update from './components/updatecomplaint';
import MyComplaints from './components/mycomplaints';




const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <HeroSection />
            <CardsSection />
            <ReviewsSection />
            <Footer />
          </>} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/upvote" element={<Upvote />} />
          <Route path="/track" element={<Track />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<Update />} />
          <Route path="/mycomplaints" element={<MyComplaints />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

