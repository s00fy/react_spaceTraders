import { useState, useEffect } from "react";
import GoodModal from "./GoodModal";
import '../../style/market.css';

const MarketRender = ({wpSymbol, systemSymbol, shipSymbol, shipCargo }) => {
    const token = localStorage.getItem('token');
    const [marketInfo, setMarketInfo] = useState(null);
    const [canSell, setCanSell] = useState(false);
    const [good, setGood] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          const options = {
            endpoint: `/systems/${systemSymbol}/waypoints/${wpSymbol}/market`,
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
            setMarketInfo(data.data);
          } catch (error) {
            console.error('Error fetching market info:', error);
          }
        };

        if (!marketInfo) {
          fetchData();
        }
      }, [wpSymbol, systemSymbol, token, marketInfo]);


      const handleSingleGoodBackup = (good) => {
        setCanSell(false);
        setGood(good);
        shipCargo.inventory.forEach(item => {
          if (item.symbol === good) {
            setCanSell(true);
          }
        });
      }

      const handleSingleGood = (selectedGood) => {
        setCanSell(false);
        setGood((prevGood) => {
          // Use the selectedGood if it's provided, otherwise use the previous state
          const currentGood = selectedGood || prevGood;
      
          shipCargo.inventory.forEach((item) => {
            if (item.symbol === currentGood) {
              setCanSell(true);
            }
          });
      
          return currentGood;
        });
      };

      const displayGoods = marketInfo && marketInfo.tradeGoods ? (
        marketInfo.tradeGoods.map((good, index) => (
          <li key={index} className="marketList__item" onClick={() => handleSingleGood(good.symbol)}>
            <p className="good__name">{good.symbol}</p>
            <div className="good__price">
              <div className="good__buy">
                <img src="./img/icons/loan.svg" className='good__icon'/>
                <p className="good__buyPrice"> Buy : {good.purchasePrice}</p>
              </div>
              <div className="good__sell">
                <img src="./img/icons/profit.svg" className='good__icon'/>
                <p className="good__sellPrice"> Sell : {good.sellPrice}</p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p>Scanning goods...</p>
      );
    
      return(
        <div className="market">
        { marketInfo ?
          <ul className="marketList">{displayGoods}</ul> : <p>Searching for marketplace... </p>
        }
        { good ?
          <GoodModal good={good} sell={canSell} shipCargo={shipCargo} shipSymbol={shipSymbol} />
        
        : null}
        </div>
      )

}

export default MarketRender;

