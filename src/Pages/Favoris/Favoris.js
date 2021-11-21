import "./favoris.css";

import spiderMan from "../../assets/img/spiderMan.jpg";
import Fav from "../../components/Fav/Fav";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import Cookies from "js-cookie";

const Favoris = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  let classType = "";

  const navigate = useNavigate();

  const userID = localStorage.getItem("userID");
  const token = Cookies.get("Token");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-fo-only.herokuapp.com/favorite`,
          userID,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsDeleting(true);
        const originalsFavorite = response.data;
        setData(originalsFavorite);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [userID, isDeleting, token]);

  return isLoading ? (
    <div className="loading-page">
      <span>En cours de chargement</span>
      <CircularProgress />
    </div>
  ) : (
    <>
      {data.length > 0 ? (
        <div>
          <div className="background">
            <main className="card-container">
              {data.map((elements, index) => {
                if (elements.key === "characters") {
                  classType = "classCharacters";
                } else {
                  classType = "classcomics";
                }
                return (
                  <div className={classType}>
                    <Fav
                      setIsDeleting={setIsDeleting}
                      name={elements.name}
                      userId={elements._id}
                      picture={elements.picture}
                      description={elements.description}
                      extension={elements.extension}
                    />
                  </div>
                );
              })}
            </main>
          </div>
        </div>
      ) : (
        <div className="empty-container">
          <section className="empty-section">
            <img src={spiderMan} alt="not found" className="empty-image" />;
            <div className="no-favorite-container">
              <h1 className="no-favorite">
                Vos favoris sont vides <br /> Cliquez sur l'areignée pour en
                ajouter.
              </h1>
            </div>
            <div className="empty-plus-container">
              <button className="empty-plus">
                <FaPlus
                  onClick={() => {
                    navigate("/personnages");
                  }}
                />
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Favoris;
