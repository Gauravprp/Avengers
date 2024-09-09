import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function AuthForm() {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

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
      console.log(result);
      if (result.includes("Login successful")) {
        setMessage(result);
        window.location.href = "/shop";
      } else {
        setMessage(result);
      }
    } catch (error) {
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
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleLogout = () => {
    window.location.href =
      "https://vinayk57.sg-host.com/wp-login.php?action=logout";
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
      {formType === "shop" && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default AuthForm;
