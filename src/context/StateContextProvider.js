import { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

const StateContextProvider = ({ ContactReducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(ContactReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);

export { StateContextProvider, useStateValue };
