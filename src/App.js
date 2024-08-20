import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Progress from "./Progress";
import Post from "./Post"; // Adjust the import path as necessary
import PostSingle from "./PostSingle"; // Import the new PostSingle component
import "./App.css"; // Import CSS for App if needed

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="app-container bg-[#000] px-[5%] py-[60px]">
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/contact-us" element={<Progress />} />
            <Route path="/privacy-policy" element={<Progress />} />
            <Route path="/terms-of-use" element={<Progress />} />
            <Route path="/post/:id" element={<PostSingle />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
