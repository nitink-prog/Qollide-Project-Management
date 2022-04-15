import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleChangeFile = (e) => {
    setThumbnail(null);
    let usrImg = e.target.files[0];
    console.log(usrImg);

    // Checking for validity
    if (!usrImg) {
      setThumbnailError("Please upload a profile picture!");
      return;
    }
    if (!usrImg.type.includes("image")) {
      setThumbnailError("Please select an image file! (.jpg .png)");
      return;
    }
    if (usrImg.size > 1000000) {
      setThumbnailError("Please select an image smaller than 1MB!");
      return;
    }
    // Success
    setThumbnailError(null);
    setThumbnail(usrImg);
    console.log("Profile picture updated");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Brace for Qollision!</h2>
      <p>Create an account.</p>
      <Link to="/login">Already have one?</Link>
      <label>
        <span>Name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Profile Picture:</span>
        <input required type="file" onChange={handleChangeFile} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Sign up</button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
