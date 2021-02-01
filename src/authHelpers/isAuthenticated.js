import axios from "axios";
import { API } from "../backend";

export const isAuthenticated = () => {
  axios.get("/");
};
