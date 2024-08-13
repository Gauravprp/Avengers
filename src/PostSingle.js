import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostSingle.css"; // Import the CSS file for styling

const PostSingle = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/wordpress/wp-json/wp/v2/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  // Access ACF fields
  const acfFields = post.acf || {}; // Default to an empty object if ACF is undefined

  return (
    <div className="single-post-container">
      <h1 className="text-3xl font-bold">{post.title.rendered}</h1>
      <div className="post-content mt-4">
        <div
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          className="post-content"
        />
      </div>

      {/* Displaying ACF fields */}
      <div className="acf-fields mt-8">
        {/* Strength */}
        {acfFields.strength && (
          <div className="acf-section acf-strength">
            <p className="acf-section-title">
              <strong>Strength:</strong>
            </p>

            <span dangerouslySetInnerHTML={{ __html: acfFields.strength }} />
          </div>
        )}

        {/* Weakness */}
        {acfFields.weakness && (
          <div className="acf-section acf-weakness">
            <p className="acf-section-title">
              <strong>Weakness:</strong>
            </p>

            <span dangerouslySetInnerHTML={{ __html: acfFields.weakness }} />
          </div>
        )}

        {/* Movies */}
        {acfFields.movies && (
          <div className="acf-section acf-movies">
            <p className="acf-section-title">
              <strong>Movies:</strong>
            </p>

            <span dangerouslySetInnerHTML={{ __html: acfFields.movies }} />
          </div>
        )}

        {/* Weapons */}
        {acfFields.weapons && (
          <div className="acf-section acf-weapons">
            <p className="acf-section-title">
              <strong>Weapons:</strong>
            </p>

            <span dangerouslySetInnerHTML={{ __html: acfFields.weapons }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSingle;
