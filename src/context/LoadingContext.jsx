import { createContext, useState, useContext } from "react";
import { Loader } from "../components/Loader";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      <Loader />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
