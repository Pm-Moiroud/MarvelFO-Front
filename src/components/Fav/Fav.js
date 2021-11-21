import "./fav.css";

import { FcDislike } from "react-icons/fc";

import axios from "axios";
import Cookies from "js-cookie";

const Fav = ({ name, picture, description, extension, setIsDeleting }) => {
  const handleClick = () => {
    const userId = localStorage.getItem("userID");
    const token = Cookies.get("Token");

    const formData = new FormData();
    formData.append("userId", userId);

    const fetchData = async () => {
      const response = await axios.delete(
        "https://marvel-fo-only.herokuapp.com/deletefavorite",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "form-data",
          },
        }
      );
      console.log(response.data);
      setIsDeleting(false);
    };
    fetchData();
  };

  return (
    <>
      <section className="section-favorite">
        <div>{name}</div>
        <FcDislike className="favorite" onClick={handleClick} />
        <img src={picture + "." + extension} alt="notfound" />
        <p>{description}</p>
      </section>
    </>
  );
};
export default Fav;
