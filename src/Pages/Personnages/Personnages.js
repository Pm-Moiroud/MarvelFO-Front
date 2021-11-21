import "./personnages.css";

import Personnage from "../../components/Personnage/Personnage";

import axios from "axios";
import { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

const Personnages = ({ params, setParams, favorite, setFavorite, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // pagination
  const [skipNumber, setSkipNumber] = useState(0);

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
          `https://marvel-fo-only.herokuapp.com/characters`,
          {
            params,
          }
        );
        const originalsCharacters = response.data;
        setData(originalsCharacters);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [params]);

  return isLoading ? (
    <div className="loading-page">
      <span>En cours de chargement</span>
      <CircularProgress />
    </div>
  ) : (
    <div className="background text-btn">
      <div className="navigation-container">
        <nav className="navigation-section">
          <span>Les Personnages de Marvel </span>
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
              <Personnage
                token={token}
                setFavorite={setFavorite}
                favorite={favorite}
                key={index}
                name={elements.name}
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

export default Personnages;
