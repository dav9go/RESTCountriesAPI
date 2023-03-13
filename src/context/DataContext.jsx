import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  async function getData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
