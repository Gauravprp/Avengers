import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Shop from "./Shop";
import Progress from "./Progress";
import Game from "./Game";
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
            <Route path="/game" element={<Game />} />
            <Route path="/contact-us" element={<Progress />} />
            <Route path="/privacy-policy" element={<Progress />} />
            <Route path="/terms-of-use" element={<Progress />} />
            <Route path="/post/:id" element={<PostSingle />} />
            <Route path="/Shop" element={<Shop />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
