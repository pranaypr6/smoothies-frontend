import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API } from "../backend";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const [{ user }, dispatch] = useUserContext();
  const history = useHistory();
  const signout = async () => {
    await axios
      .get(`${API}/logout`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => history.push("/login"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="header">
      <nav>
        <Link to="/">Ninja Smoothies</Link>
        <ul>
          {user && (
            <li onClick={() => signout()}>
              <Link to="">Log out</Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup" className="btn">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
