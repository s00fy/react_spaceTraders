import { useEffect, useState } from "react";
import RouteDetails from "../RouteDetails";

const ShipStatus = ({shipNav, shipSymbol}) => {
    const token = localStorage.getItem('token');
    const [isStateChanged, setIsStateChanged] = useState('s');
    const [isDocked, setIsDocked] = useState(null);
    
    useEffect(() => {
      if (shipNav.status === "DOCKED" ) {
        setIsDocked(true);
      }else{
        setIsDocked(false);
      }
        isDocked === false ? setIsDocked(false) : setIsDocked(true);
        setIsStateChanged(isStateChanged);
        setIsDocked((current) => !current);
      }, [isStateChanged]);
    
      const handleClickStatus = async () => {
        let options = {};
        if (isDocked === false) {
          options = {
            endpoint: `my/ships/${shipSymbol}/dock`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          setIsDocked(false);
        } else {
          options = {
            endpoint: `my/ships/${shipSymbol}/orbit`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          setIsDocked(true);
        }
        try {
          const response = await fetch(
            `https://api.spacetraders.io/v2/${options.endpoint}`,
            options
          );
          const data = await response.json();
          setIsStateChanged(data.data);
          console.log(data.data.nav.status);
          } catch (error) {
            console.error('Error changing the ship status :', error);
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
