import "./home.css";

import marvel from "../../assets/img/marvel.jpg";

import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="only">
      <section className="home-section">
        <img src={marvel} alt="" />
        <button
          onClick={() => {
            navigate("/personnages");
          }}
          className="banner-button"
        ></button>
      </section>
    </div>
  );
};

export default Home;
