import React from "react";
import { useEffect, useState } from "react";
import RouteDetails from "../RouteDetails";

const ShipStatus = ({shipNav, shipSymbol}) => {
    const token = localStorage.getItem('token');
    const [isStateChanged, setIsStateChanged] = useState('');
    const [isDocked, setIsDocked] = useState(null);
    
    useEffect(() => {
      if (shipNav.status === "DOCKED" ) {
        setIsDocked(true);
      }else{
        setIsDocked(false);
      }
      //dk why but it's not working without it
      isDocked ? setIsDocked(false) : setIsDocked(true);
      setIsDocked((current) => !current);
      }, [isStateChanged, shipNav.status, isDocked ]);
    
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
          setIsDocked(true);
          console.log('isDocked true');
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
          setIsDocked(false);
          console.log('isDocked false');
        }
        try {
          const response = await fetch(
            `https://api.spacetraders.io/v2/${options.endpoint}`,
            options
          );
          const data = await response.json();
          setIsStateChanged(data.data);
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
