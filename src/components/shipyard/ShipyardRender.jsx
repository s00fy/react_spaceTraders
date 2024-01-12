import { useState, useEffect, useRef, useCallback } from "react";

const ShipyardRender = ({systemSymbol, wpSymbol}) => {
    const token = localStorage.getItem("token");
    const [shipyardInfo, setShipyardInfo] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [successfullyPurchased, setSuccessfullyPurchased] = useState(false);
    const buyRef = useRef(null);

    const sendRequest = useCallback(async (shipType) => {
        if (isSending) return;
        setIsSending(true);
        console.log('sendRequest working');
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
          console.log('fetch request');
          console.log(data);
          if(data.data.agent){
            setSuccessfullyPurchased(true);
        }
    } catch (error) {
            setSuccessfullyPurchased(false);
          console.error('Error buying a ship info:', error);
        }
      setIsSending(false);
    }, [isSending, wpSymbol]);

    const fetchData = async () => {
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
    };
    
    useEffect(() => {
    
        fetchData();
      }, [wpSymbol, systemSymbol, token]);

      const displayShipsToSell = shipyardInfo && shipyardInfo.ships ? (
        shipyardInfo.ships.map((ship, index) => (
            <li key={index} className="shipyardList__item">
                <p className="shipyard__ship__title"> {ship.name} </p>
                <p className="shipyard__ship__description"> {ship.description} </p>
                <span className="shipyard__ship__buy">
                <button className="shipyard__ship__buyPrice" disabled={isSending} onClick={() => sendRequest(ship.type)} ref={buyRef}> 
                    Buy for {ship.purchasePrice} 
                    <img src="./img/icons/coins.svg" className='shipyard__ship__moneyIcon'/>
                </button>
              </span>
            </li>
        ))
        ) : (
            <p>Displaying ships...</p>
        );
    return(
        <>
        <div className="shipyard">
            {shipyardInfo ?
            <>
                {successfullyPurchased ? <p className="fetch__success"> You just successfully purchased a ship ! </p> : null }
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
