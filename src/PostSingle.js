import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostSingle.css"; // Import the CSS file for additional styling

const PostSingle = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the post details
    axios
      .get(`http://avengerss.rf.gd/wp-json/wp/v2/posts/${id}?_embed`)
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

  if (loading) return <p className="h-[80vh]">Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  // Access ACF fields
  const acfFields = post.acf || {}; // Default to an empty object if ACF is undefined

  // Extract the featured image URL from the embedded media
  const featuredImageUrl =
    post._embedded &&
    post._embedded["wp:featuredmedia"] &&
    post._embedded["wp:featuredmedia"][0].source_url;

  return (
    <div className="container mx-auto ">
      <div className="flex max-[1000px]:flex-col-reverse gap-4 max-[800px]:gap-y-[40px]">
        <div className="flex-1 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            className="post-content"
          />

          {/* Displaying ACF fields */}
          <div className="acf-fields mt-8">
            {/* Strength */}
            {acfFields.strength && (
              <div className="acf-section acf-strength mb-4">
                <p className="acf-section-title font-semibold">
                  <strong>Strength:</strong>
                </p>
                <span
                  dangerouslySetInnerHTML={{ __html: acfFields.strength }}
                />
              </div>
            )}

            {/* Weakness */}
            {acfFields.weakness && (
              <div className="acf-section acf-weakness mb-4">
                <p className="acf-section-title font-semibold">
                  <strong>Weakness:</strong>
                </p>
                <span
                  dangerouslySetInnerHTML={{ __html: acfFields.weakness }}
                />
              </div>
            )}

            {/* Movies */}
            {acfFields.movies && (
              <div className="acf-section acf-movies mb-4">
                <p className="acf-section-title font-semibold">
                  <strong>Movies:</strong>
                </p>
                <span dangerouslySetInnerHTML={{ __html: acfFields.movies }} />
              </div>
            )}

            {/* Weapons */}
            {acfFields.weapons && (
              <div className="acf-section acf-weapons mb-4">
                <p className="acf-section-title font-semibold">
                  <strong>Weapons:</strong>
                </p>
                <span dangerouslySetInnerHTML={{ __html: acfFields.weapons }} />
              </div>
            )}
          </div>
        </div>

        <div className="">
          {featuredImageUrl && (
            <img
              src={featuredImageUrl}
              alt="Featured"
              className="w-full h-[600px] object-cover object-top"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSingle;
