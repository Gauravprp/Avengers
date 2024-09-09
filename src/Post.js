import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Post = () => {
  const [heroes, setHeroes] = useState([]);
  const [villain, setVillain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts by category
  useEffect(() => {
    const fetchHeroes = axios.get(
      "https://vinayk57.sg-host.com/wp-json/wp/v2/posts?categories=1&_embed" // Replace '1' with the correct ID
    );
    const fetchVillain = axios.get(
      "https://vinayk57.sg-host.com/wp-json/wp/v2/posts?categories=4&_embed" // Replace '4' with the correct ID
    );

    Promise.all([fetchHeroes, fetchVillain])
      .then(([heroesResponse, villainResponse]) => {
        setHeroes(heroesResponse.data);
        setVillain(villainResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="h-[80vh]">Loading...</p>;
  if (error) {
    return (
      <div>
        <p>Error loading posts: {error.message}</p>
        <pre>{JSON.stringify(error.response?.data, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img
          src="/images/HeroBanner.gif"
          alt="Avengers Banner"
          className="w-[100%]  "
        />{" "}
      </div>
            <div>
            <Link to="/Auth">
                <button>
                  <u>Login / Signup</u>
                </button>
            </Link>
            </div>
      <div className="post-container py-[60px]">
        {/* Heroes Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-left">Heroes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroes.map((post) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="post-card block bg-[#2a2a2a]  shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {post._embedded &&
                post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"][0] ? (
                  <div className="overflow-hidden">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-[500px] object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="overflow-hidden bg-[#2a2a2a] h-48 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="post-title text-xl font-bold mb-2">
                    {post.title.rendered}
                  </h3>
                  <div
                    className="post-excerpt text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Villain Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-left">Villains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {villain.map((post) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="post-card block bg-[#2a2a2a] shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {post._embedded &&
                post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"][0] ? (
                  <div className="overflow-hidden">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-[500px] object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="overflow-hidden bg-[#2a2a2a] h-48 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="post-title text-xl font-bold mb-2">
                    {post.title.rendered}
                  </h3>
                  <div
                    className="post-excerpt text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Post;
