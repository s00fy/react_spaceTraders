import { useState, createContext, useContext } from "react";
import { useAuthContext } from "./authContext";

const ShipContext = createContext();

export const ShipContextProvider = ({ children }) => {
    const auth = useAuthContext();
  const token = auth.userToken;
  const user = auth.user;
  const [isValid, setIsValid] = useState(true);
  const [shipsList, setShipsList] = localStorage.getItem("shipsList");
  const [ship, setShip] = localStorage.getItem("ship");

  const fetchShipsList = async () => {
    const options = {
      endpoint: "my/ships",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    };
  
    try {
      const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error during login:", errorData);
        setIsValid(false);
      } else {
        const data = await response.json();
        setShipsList(data.data); 
        localStorage.setItem("shipsList", JSON.stringify(data.data));
        setIsValid(true);
        console.log('fecth SHIPS working');
      }
    } catch (error) {
      setIsValid(false);
      throw error;
    }
  };
  

  const fetchShip = () => {
  };
  

  return (
    <ShipContext.Provider value={{ shipsList, ship, isValid, fetchShipsList, children}}>
      {children}
    </ShipContext.Provider>
  );
};

export const useShipContext = () => {

  return useContext(ShipContext);
};