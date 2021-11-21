import "./signup.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Signup = ({ giveToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const fetchData = async () => {
        const response = await axios.post(
          "https://marvel-fo-only.herokuapp.com/user/signup",
          {
            email: email,
            password: password,
            username: username,
          }
        );
        giveToken(response.data.token);
        navigate("/");
      };
      fetchData();
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Problem");
      }
    }
  };

  return (
    <div className="flex-container">
      <div className="form-container-background">
        <div className="form-container">
          <h1>S'incrire</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="Password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="checkbox">
              <input type="checkbox" />
              <div>Accepter les conditions générales </div>
            </div>

            <div className="submit-container">
              <button className="submit-btn">S'inscrire</button>
              <Link to="/login">
                <span className="already-user">
                  Tu as déjà un compte ? Connecte-toi !
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
