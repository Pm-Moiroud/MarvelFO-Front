import PersonnageId from "../../components/PersonnageId/PersonnageId";

import { useParams } from "react-router";
import { useState, useEffect } from "react";

import axios from "axios";

const PersonnagesComics = () => {
  const { characterId } = useParams();
  const [comicList, setComicList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-fo-only.herokuapp.com/comics/${characterId}?`
        );
        setComicList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [characterId]);

  return (
    <div className="CharByPersonnage">
      {isLoading ? (
        <div>Page Loading ... </div>
      ) : (
        <div className="background">
          <main className="card-container">
            {comicList.comics.map((comic, index) => {
              return (
                <div className="card">
                  <PersonnageId
                    key={index}
                    title={comic.title}
                    picture={comic.thumbnail.path}
                    extension={comic.thumbnail.extension}
                    description={comic.description}
                  />
                </div>
              );
            })}
          </main>
        </div>
      )}
    </div>
  );
};

export default PersonnagesComics;
