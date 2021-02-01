import React, { useEffect, useState } from "react";
import smoothie from "./smoothie.png";
import axios from "axios";
import { API } from "../backend";
import { Redirect } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Smoothies = () => {
  const [redirect, setRedirect] = useState(false);
  const [{ user }, dispatch] = useUserContext();

  useEffect(() => {
    const getSmoothies = async () => {
      axios
        .get(`${API}/smoothies`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.user) {
            dispatch({ type: "SET_USER", user: data.user._id });
          } else {
            setRedirect(true);
          }
        })
        .catch((err) => console.log(err));
    };
    getSmoothies();
  }, []);

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="smoothies">
      <ul className="recipes">
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Tropical Twist</h4>
          <p>Peach, Pinapple, Apple juice</p>
        </li>
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Tropical Twist</h4>
          <p>Peach, Pinapple, Apple juice</p>
        </li>
        <li className="recipe">
          <img src={smoothie} alt="smoothie recipe icon" />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
      </ul>
      {performRedirect()}
    </div>
  );
};

export default Smoothies;
