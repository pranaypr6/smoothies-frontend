import React, { createContext, useContext, useReducer } from "react";

export const UserContext = createContext();

export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const StateProvider = ({ reducer, initialState, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);

export const useUserContext = () => useContext(UserContext);
