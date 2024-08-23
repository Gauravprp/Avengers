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
      .get("https://vinayk57.sg-host.com/wp-json/wp/v2/game/per_page=1")
      .then((response) => {
        setGames(response.data);
        console.log(response);
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

  const currentGame = games[currentIndex];
  if (!currentGame) return null; // Ensure there is a game to display

  const options = [
    currentGame.acf.upload_answers[0].answer_1,
    currentGame.acf.upload_answers[0].answer_2,
    currentGame.acf.upload_answers[0].answer_3,
    currentGame.acf.upload_answers[0].answer_4,
  ];

  return (
    <>
      <section className="flex justify-center h-[50vh] quiz-section">
        <div
          className={`transition-transform duration-500 ease-in-out ${
            animation === "slide-in" ? "animate-slide-in" : "animate-slide-out"
          } text-center w-full max-w-md`}
        >
          {isQuizCompleted ? (
            <div className="completion-message">
              <p>
                Congratulations! You have successfully completed the quiz. Your
                knowledge is out of this world!
                <br />
                <br />
                We hope you had fun and learned something new. Celebrate your
                victory with us and enjoy the achievement!
              </p>
              <div className="party-popper"></div>
              {/* <button className="snap-button" onClick={handleRestart}>
                <img src="path-to-snap-icon.svg" alt="Snap Icon" />
                Snap Me
              </button> */}
              <Link to="/">
                <button>
                  <u>Back to Home</u>
                </button>
              </Link>
            </div>
          ) : (
            <>
              <span className="block text-2xl font-bold mb-4">
                Q {currentIndex + 1}.
              </span>
            <span className="block mb-4 text-start">
                {currentGame.title.rendered}
              </span>

              <div className="quiz-options mb-4">
                {options.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center mb-4 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${currentGame.id}`}
                      value={option}
                      className="hidden"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      checked={selectedOption === option}
                    />
                    <span
                      className={`w-5 h-5 mr-3 border-2 border-[#EA2328] rounded-full flex items-center justify-center ${
                        selectedOption === option ? "bg-[#EA2328]" : ""
                      }`}
                    >
                      {selectedOption === option && (
                        <span className="w-3 h-3 bg-white rounded-full"></span>
                      )}
                    </span>
                    {`${["A", "B", "C", "D"][i]}) ${option}`}
                  </label>
                ))}
              </div>

              {/* Feedback Div */}
              <div
                className={`mt-4 p-4 ${
                  feedback === "correct"
                    ? "bg-green-400 animate-pulse text-[#fff] font-[700]"
                    : feedback === "incorrect"
                    ? "bg-red-400 animate-pulse text-[#fff] font-[700]"
                    : ""
                }`}
              >
                {feedback === "correct"
                  ? "Correct Answer!"
                  : feedback === "incorrect"
                  ? "Incorrect Answer!"
                  : ""}
              </div>

              {/* Restart Quiz Button */}
              {feedback === "incorrect" && (
                <div className="mt-4">
                  <button
                    onClick={handleRestart}
                    className="p-2 bg-[#EA2328] text-white rounded"
                  >
                    Restart Quiz
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <section></section>
    </>
  );
}

export default Game;
