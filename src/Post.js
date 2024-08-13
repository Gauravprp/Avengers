import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/wordpress/wp-json/wp/v2/posts/?_embed")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="post-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-[60px]">
      {posts.map((post) => (
        <Link
          to={`/post/${post.id}`} // Use Link to navigate to PostSingle
          key={post.id}
          className="post-card block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Check if featured media exists */}
          {post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0] ? (
            <div className="overflow-hidden ">
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="w-full h-[500px] object-cover object-top"
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-t-lg bg-gray-200 h-48 flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
          <div className="p-4">
            <h2 className="post-title text-xl font-bold mb-2">
              {post.title.rendered}
            </h2>
            {/* Check if author info exists */}
            {post._embedded &&
            post._embedded.author &&
            post._embedded.author[0] ? (
              <p className="post-author text-gray-600 mb-1">
                {/* By: {post._embedded.author[0].name} */}
              </p>
            ) : (
              <p className="post-author text-gray-600 mb-1">
                By: Unknown Author
              </p>
            )}
            <p className="post-date text-gray-500 mb-4">
              {/* {new Date(post.date).toLocaleDateString()} */}
            </p>
            <div
              className="post-excerpt text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Post;
