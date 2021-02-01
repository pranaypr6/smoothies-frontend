import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../backend";
import { useHistory, Redirect } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [{ user }, dispatch] = useUserContext();

  useEffect(() => {
    const home = async () => {
      axios
        .get(`${API}/`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.user) {
            setName(data.user.email);
            dispatch({ type: "SET_USER", user: data.user._id });
          } else {
            setRedirect(true);
          }
        })
        .catch((err) => console.log(err));
    };
    home();
  }, []);

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/login" />;
    }
  };
  return (
    <header>
      <div className="smoothie">
        <img src={require("./smoothie.png")} alt="" />
      </div>
      <div className="headings">
        <h2>Smoothie Recipes</h2>
        {name && <h3>For you {name}</h3>}
        <p onClick={(e) => history.push("/smoothies")} className="btn">
          View Recipes
        </p>
      </div>
      {performRedirect()}
    </header>
  );
};

export default Home;
