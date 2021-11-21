import "./personnage.css";

import { Link } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";

import axios from "axios";
import Cookies from "js-cookie";

const Personnage = ({ name, id, picture, description, extension }) => {
  const handleClick = () => {
    const userId = localStorage.getItem("userID");
    const token = Cookies.get("Token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("extension", extension);
    formData.append("key", "characters");
    formData.append("userId", userId);

    const fetchData = async () => {
      const response = await axios.post(
        "https://marvel-fo-only.herokuapp.com/addfavorite",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    };
    fetchData();
  };
  return (
    <>
      <section className="section-char">
        <div>{name}</div>
        <FcLikePlaceholder className="favorite" onClick={handleClick} />
        <div className="relatif-section">
          <Link to={`/comics/${id}`} key={id}>
            <img src={picture + "." + extension} alt="not found" />{" "}
            <p>{description}</p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Personnage;
