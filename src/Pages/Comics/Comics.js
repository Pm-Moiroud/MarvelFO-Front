import "./comics.css";

import Comic from "../../components/Comic/Comic";
import axios from "axios";
import { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

const Comics = ({ skipNumber, setSkipNumber }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState();

  const handleClickPlus = () => {
    setParams((prevParams) => ({
      ...prevParams,
      skip: skipNumber + 100,
    }));
    setSkipNumber(skipNumber + 100);
  };

  const handleClickMinus = () => {
    setParams((prevParams) => ({
      ...prevParams,
      skip: skipNumber - 100,
    }));
    setSkipNumber(skipNumber - 100);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-fo-only.herokuapp.com/comics`,
          {
            params,
          }
        );
        const originalsCharacters = response.data;
        setData(originalsCharacters);
        setIsLoading(false);
        console.log("Ici les params ", params);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [params]);

  return isLoading ? (
    <div className="loading-page">
      <span>En cours de chargement</span> <CircularProgress />
    </div>
  ) : (
    <div className="background">
      <div className="navigation-container">
        <nav className="navigation-section">
          <span>Les Comics de marvel </span>
          <input
            onChange={(e) =>
              setParams((prevParams) => ({
                ...prevParams,
                name: e.target.value,
              }))
            }
            placeholder="Chercher des articles"
            type="text"
          />
          <div className="container-search-btn">
            <button className="header-btn" onClick={handleClickMinus}>
              Page précedente
            </button>
            <button className="header-btn" onClick={handleClickPlus}>
              Page suivante
            </button>
          </div>
        </nav>
      </div>
      <main className="card-container">
        {data.map((elements, index) => {
          return (
            <div className="card">
              <Comic
                key={index}
                name={elements.title}
                id={elements._id}
                picture={elements.thumbnail.path}
                description={elements.description}
                extension={elements.thumbnail.extension}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Comics;
