import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css"; // Import CSS for App if needed

function Game() {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(""); // Currently selected option
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animation, setAnimation] = useState("slide-in");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    // Fetch the game data from WordPress REST API
    axios
      .get("https://vinayk57.sg-host.com/wp-json/wp/v2/game")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    const correctAnswer =
      games[currentIndex].acf.upload_answers[0].correct_answer;

    setSelectedOption(selected);
    setIsSubmitted(true);

    if (selected === correctAnswer) {
      setFeedback("correct");
      setTimeout(() => {
        setAnimation("slide-out");
        setTimeout(() => {
          // Move to the next question after the slide-out animation
          const nextIndex = (currentIndex + 1) % games.length;
          if (nextIndex === 0) {
            setIsQuizCompleted(true); // Set quiz as completed
          }
          setCurrentIndex(nextIndex);
          setAnimation("slide-in");
          setSelectedOption(""); // Clear the selected option
          setFeedback("");
          setIsSubmitted(false);
        }, 500); // Delay for slide-out animation
      }, 1000); // Delay for feedback message
    } else {
      setFeedback("incorrect");
    }
  };

  const handleRestart = () => {
    setSelectedOption("");
    setFeedback("");
    setIsSubmitted(false);
    setCurrentIndex(0); // Restart quiz from the first question
    setIsQuizCompleted(false); // Reset quiz completion state
  };

  if (!games.length) return <p>Loading games...</p>; // Display a loading message

  return (
    <section className="flex justify-center flex-wrap gap-8 p-4">
      {games.map((game, index) => (
        <div
          key={game.id}
          className="game-card bg-white shadow-lg rounded-lg p-4 w-full max-w-sm"
        >
          <h2 className="text-xl font-bold mb-4">{game.title.rendered}</h2>
          <p>{game.excerpt.rendered.replace(/<[^>]+>/g, '')}</p> {/* Display excerpt or any other content */}
          
          <Link
            to={`/game/${game.id}`}
            className="block mt-4 bg-blue-500 text-white text-center py-2 rounded"
          >
            Play Quiz
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Game;
