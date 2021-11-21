import "./login.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

const Login = ({ giveToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const fetchData = async () => {
        const response = await axios.post(
          "https://marvel-fo-only.herokuapp.com/user/login",
          {
            email: email,
            password: password,
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
      <section className="form-container-background">
        <div className="form-container">
          <h1>Se connecter</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              placeholder="Nom de compte"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="submit-container">
              {" "}
              <button className="btn-submit-form">Se connecter</button>
              <Link to="/signup">
                <span className="already-user">
                  Tu n'as pas encore de compte ? Inscris-toi !
                </span>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
