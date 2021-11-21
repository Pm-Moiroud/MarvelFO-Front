import "./header.css";
import logoMarvel from "../../assets/svg/logoMarvel.svg";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("Token");

  const handleClick = () => {
    if (token) {
      navigate("/favoris");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="background-header">
      <header className="header-container">
        <Link to="/">
          <img className="marvel-logo" src={logoMarvel} alt="not found" />
        </Link>

        <nav className="nav-pages">
          <Link to="/personnages">
            <button className="header-btn ">Personnages</button>
          </Link>
          <Link to="/comics">
            <button className="header-btn ">Comics</button>
          </Link>

          <button onClick={handleClick} className="header-btn ">
            Favoris
          </button>
        </nav>

        {token ? (
          <button
            className="header-btn"
            onClick={() => {
              Cookies.remove("Token");
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="login-signup ">
            <Link to="/SignUp">
              <button className="header-btn ">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="header-btn margin-header">Se connecter</button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
