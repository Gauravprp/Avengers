// src/components/AuthForm.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "login") {
      handleLogin();
    } else {
      handleRegistration();
    }
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("action", "custom_user_login");
    formData.append("username_email", username);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://vinayk57.sg-host.com/wp-admin/admin-ajax.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.text();
<<<<<<< HEAD
      if (result.includes("Login successful")) {
        setMessage("Login successful");
        login(); // Use context to handle login
=======
      console.log(result); // Log the raw response

      if (result.includes("Login successful")) {
        setMessage("Login successful");
        navigate("/"); // Navigate to the home page
>>>>>>> 2872d7c964e901c8abe1a7faa04c9fefe89e7a39
      } else {
        setMessage(result);
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Error during login:", error);
=======
      console.error("Error during login:", error); // Log any errors
>>>>>>> 2872d7c964e901c8abe1a7faa04c9fefe89e7a39
      setMessage("Login failed. Please try again.");
    }
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("action", "custom_user_registration");
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    try {
      const response = await fetch(
        "https://vinayk57.sg-host.com/wp-admin/admin-ajax.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.text();
      setMessage(result);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error during registration:", error);
=======
      console.error("Error during registration:", error); // Log any errors
>>>>>>> 2872d7c964e901c8abe1a7faa04c9fefe89e7a39
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>{formType === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        {formType === "register" && (
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {formType === "register" && (
          <div>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <div>
          <button type="submit">
            {formType === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
      <button
        onClick={() => setFormType(formType === "login" ? "register" : "login")}
      >
        {formType === "login" ? "Switch to Register" : "Switch to Login"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AuthForm;
