import {useEffect, useState } from 'react';
import MarketRender from '../market/MarketRender';

const Waypoint = ({ wpSymbol, systemSymbol, shipSymbol}) => {

    const token = localStorage.getItem("token");
    const [wpInfo, setWpInfo] = useState([]);
    const [isMarketplace, setIsMarketplace] = useState(false);
    const [isShipyard, setIsShipyard] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
            console.error('Error fetching waypoints info:', error);
          }
        };
    
        fetchData();
      }, [wpSymbol, systemSymbol, isMarketplace, isShipyard, token]);

      return(
        <>
            {wpInfo.traits ? (
            <>
                <p className='wp__symbol'>{wpInfo.symbol}</p>
                <p className='wp__type'>{wpInfo.type}</p>
                <div className='wp__traitsContainer'>
                    {wpInfo.traits.map((trait, index) => (
                    <p className='wp__traits' key={index}>
                        {trait.symbol}
                    </p>
                    ))}
                </div>
            </>
            ):(
                <p>scanning your current waypoint...</p>
            )}

            {wpInfo && isMarketplace && (
                <MarketRender wpSymbol={wpSymbol} systemSymbol={systemSymbol} shipSymbol={shipSymbol} />
            )}
            {wpInfo && isShipyard && (
                <button>Show ShipYard</button>
            )}

        </>
      );

}
export default Waypoint;