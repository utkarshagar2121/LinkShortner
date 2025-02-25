/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./Hooks/userFetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  // console.log("user:", user);
  const isAuthenticated = user?.role === "authenticated";
  // console.log("isAuthenticated:", isAuthenticated);
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
