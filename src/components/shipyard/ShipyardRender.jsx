import { useState, useEffect, useRef, useCallback } from "react";
import React from 'react';

const ShipyardRender = ({systemSymbol, wpSymbol}) => {
    const token = localStorage.getItem("token");
    const [shipyardInfo, setShipyardInfo] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(false);
    const [successfullyPurchased, setSuccessfullyPurchased] = useState(false);
    const buyRef = useRef(null);

    const sendRequest = useCallback(async (shipType) => {
        if (isSending) return;
        setIsSending(true);
      const options = {
          method: "POST",
          endpoint: `my/ships`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ "shipType": shipType, "waypointSymbol": wpSymbol }),
        };
        try {
          const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
          const data = await response.json();
          if(data.error){
            setSuccessfullyPurchased(false);
            setError(data.error.message);
          }else if(data.data.agent){
            setSuccessfullyPurchased(true);
          }
    } catch (error) {
            setSuccessfullyPurchased(false);
          console.error('Error buying a ship info:', error);
        }
      setIsSending(false);
    }, [isSending, wpSymbol, token]);

    const fetchData = useCallback(async () => {
      const options = {
        endpoint: `/systems/${systemSymbol}/waypoints/${wpSymbol}/shipyard`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(
          `https://api.spacetraders.io/v2${options.endpoint}`,
          options
        );
        const data = await response.json();
        setShipyardInfo(data.data);
      } catch (error) {
        console.error('Error fetching shipyard info:', error);
      }
    }, [systemSymbol, wpSymbol, token]);
    
    useEffect(() => {
        fetchData();
      }, [wpSymbol, systemSymbol, token, fetchData]);

      const displayShipsToSell = shipyardInfo && shipyardInfo.ships ? (
        shipyardInfo.ships.map((ship, index) => (
            <li key={index} className="shipyardList__item">
                <p className="shipyard__ship__title"> {ship.name} </p>
                <p className="shipyard__ship__description"> {ship.description} </p>
                <span className="shipyard__ship__buy">
                <button className="shipyard__ship__buyPrice" disabled={isSending} onClick={() => sendRequest(ship.type)} ref={buyRef}> 
                    Buy for {ship.purchasePrice} 
                    <img src="./img/icons/coins.svg" alt="" className='shipyard__ship__moneyIcon'/>
                </button>
              </span>
            </li>
        ))
        ) : (
            <p>Displaying ships...</p>
        );

         const handleError = () => {
          setError(null);
          setSuccessfullyPurchased(null);
         }

    return(
        <>
        <div className="shipyard">
            {shipyardInfo ?
            <>
                {successfullyPurchased ? <p className="fetch__success" onClick={handleError}> You just successfully purchased a ship ! </p> : null }
                {error ? <p className="fetch__error notif shipyard__error" onClick={handleError}> {error} </p> : null }
                <ul className="shipyardList">
                    {displayShipsToSell}
                </ul>
            </>
                : <p>Entering the shipyard...</p>
            } 
        </div>
        </>
    )
}

export default ShipyardRender;
