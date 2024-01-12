import {useEffect, useState, useCallback } from 'react';
import MarketRender from '../market/MarketRender';
import ShipyardRender from '../shipyard/ShipyardRender';
import React from 'react';

const Waypoint = ({wpSymbol, systemSymbol, shipSymbol, shipCargo}) => {

    const token = localStorage.getItem("token");
    const [wpInfo, setWpInfo] = useState([]);
    const [isMarketplace, setIsMarketplace] = useState(false);
    const [isShipyard, setIsShipyard] = useState(false);

    const fetchData = useCallback(async () => {
      const options = {
        endpoint: `/systems/${systemSymbol}/waypoints/${wpSymbol}`,
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
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setWpInfo(data.data);
        setTimeout(() => {
          data.data.traits.forEach((trait) => {
            if (trait.symbol === 'MARKETPLACE') {
              setIsMarketplace(true);
            }
            if (trait.symbol === 'SHIPYARD') {
              setIsShipyard(true);
            }
          });
        }, 500);
      } catch (error) {
        console.error('Error fetching current waypoint info:', error);
      }
    }, [wpSymbol, systemSymbol, token]);
  
  
    useEffect(() => {
      fetchData();
    }, [wpSymbol, systemSymbol, fetchData, token]);

      return(
        <>
            {wpInfo && wpInfo.traits ? (
            <div className='wp__container'>
                <div className='wp__id'>
                  <img src="./img/icons/jupiter.png" alt='' className='wp__icon'/>
                  <p className='wp__symbol'>{wpInfo.symbol} ✼ {wpInfo.type}</p>
                </div>
                <div className='wp__traitsContainer'>
                    {wpInfo.traits.map((trait, index) => (
                    <p className='wp__traits' key={index}>
                        {trait.symbol}
                    </p>
                    ))}
                </div>
            </div>
            ):(
                <p>scanning your current waypoint...</p>
            )}

            {wpInfo && isMarketplace ? (
                <MarketRender wpSymbol={wpSymbol} shipCargo={shipCargo} systemSymbol={systemSymbol} shipSymbol={shipSymbol} />
            ) : (<p>No marketplace here</p>) }
            {wpInfo && isShipyard ? (
                <ShipyardRender systemSymbol={systemSymbol} wpSymbol={wpSymbol} />
            ) : <p>No shipyard here</p> }

        </>
      );

}
export default Waypoint;