import { useEffect, useState } from "react";
import RouteDetails from "./RouteDetails";

const ShipStatus = ({shipNav, shipSymbol}) => {
    const token = localStorage.getItem('token');
    const [isStateChanged, setIsStateChanged] = useState('');
    const [isDocked, setIsDocked] = useState(false);
    
    useEffect(() => {
      shipNav.status === "DOCKED" ? setIsDocked(true) : setIsDocked(false);
      setIsStateChanged(isStateChanged);
      setIsDocked((current) => !current);
      console.log(isDocked);
      }, [shipNav.status, isStateChanged]);
    
      const handleClickStatus = async () => {
        if (!isDocked) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          try {
              const response = await fetch(
                  `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`,
                  options
              );
              const data = await response.json();
              setIsStateChanged(data.data);
              console.log(isStateChanged);
              setIsDocked(true);
            } catch (error) {
              console.error('Error putting the ship in orbit:', error);
            }
        } else {
          console.log('well is not docked');
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response = await fetch(
                `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`,
                options
            );
            const data = await response.json();
            setIsStateChanged(data.data);
            console.log(isStateChanged);
            setIsDocked(false);
          } catch (error) {
            console.error('Error docking info:', error);
          } 
        }
      };

    return (
        <div className="navStatus">
          {isStateChanged === "IN_TRANSIT" ? (
            <RouteDetails nav={shipNav}></RouteDetails>
          ) : (null) }
            {isDocked ? (
              <>
                <p className='navStatus__pending'>Docked</p>
                <button className="navStatus__button" onClick={() => handleClickStatus()}>Go orbit mode</button>
              </>
                ) : (
              <>
                <p className='navStatus__pending'>orbit</p>
                <button className="navStatus__button" onClick={() => handleClickStatus()}>Go dock mode</button>
              </>
            )}
        </div>
    );
};

export default ShipStatus;
