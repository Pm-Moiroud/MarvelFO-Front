import { FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";

const Comic = ({ name, picture, description, extension }) => {
  const handleClick = () => {
    const userId = localStorage.getItem("userID");
    const token = Cookies.get("Token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("extension", extension);
    formData.append("key", "comics");
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
          <img src={picture + "." + extension} alt="not found" />{" "}
          <p>{description}</p>
        </div>
      </section>
    </>
  );
};

export default Comic;
