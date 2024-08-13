import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Post from "./Post"; // Adjust the import path as necessary
import PostSingle from "./PostSingle"; // Import the new PostSingle component
import "./App.css"; // Import CSS for App if needed

const App = () => {
  return (
    <Router>
      <div className="app-container px-[5%]">
        <Header />

        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/post/:id" element={<PostSingle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
