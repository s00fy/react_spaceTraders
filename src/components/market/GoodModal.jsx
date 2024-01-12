import { useState, useRef, useCallback, useEffect } from "react";

const GoodModal = ({good, shipSymbol, sell, shipCargo}) => {
    const [isSending, setIsSending] = useState(false);
    const unitRef = useRef(1);
    const token = localStorage.getItem("token");
    const [canSell, setCanSell] = useState(sell);
    const buyRef = useRef(null);
    const sellRef = useRef(null);
    const [error, setError] = useState(null);
    const [justBought, setJustBought] = useState(null);
    const [justSold, setJustSold] = useState(null);
    const [updateCargo, setUpdateCargo] = useState([]);

    const sendRequest = useCallback(async (btnRef) => {
      console.log('Good symbol in sendRequest:', good.symbol);
        if (isSending) return;
        setIsSending(true);
        const action = btnRef === buyRef ? 'purchase' : 'sell';
        if(action === 'purchase'){
          setJustSold(null);
          setJustBought(true);
        }else{
          setJustSold(true);
          setJustBought(null);
        }
        const units = parseInt(unitRef.current.value);
        console.log('sendRequest working');
      const options = {
          method: "POST",
          endpoint: `my/ships/${shipSymbol}/${action}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ "symbol": good.symbol, "units": units }),
        };
        try {
          const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
          const data = await response.json();
          console.log('fetch request');
          console.log(data.data);
          if (data.error) {
            setUpdateCargo([]);
            setJustSold(null);
            setJustBought(null);
            setError(data.error.message);
          }else if(data.data.transaction){
            setUpdateCargo(data.data.transaction);
            setError(null);

          }
        } catch (error) {
          console.error('Error fetching goods info:', error);
        }
      setIsSending(false);
    }, [isSending]);

    const handleSingleGood = useCallback(() => {
      setCanSell(false);
      shipCargo.inventory.forEach(item => {
        if (item.symbol === good.symbol) {
          setCanSell(true);
        }
      });
    }, [good.symbol, shipCargo.inventory, canSell]);
  
    useEffect(() => {
      handleSingleGood();
    }, [handleSingleGood, canSell, good.symbol]);
    
    const handleError = () => {
      setError(null);
      setJustBought(null);
      setJustSold(null);
      setUpdateCargo([]);
    }

    return(
        <div className="goodModal">
          <p className="goodModal__title"> You want to deal {good.symbol}</p>
          <input ref={unitRef} type="number" defaultValue="1" min="1" max={good.tradeVolume} className="goodModal__input"/>
          <div className="goodModal__btns">
            <button className="goodModal__btn" disabled={isSending} onClick={() => sendRequest(buyRef)} ref={buyRef}>
              Buy
              </button>
              {canSell ? <button disabled={isSending} onClick={() => sendRequest(sellRef)} className="goodModal__btn" ref={sellRef}>Sell</button> : null }
          </div>
              {error && <p className='fetch__error' onClick={handleError}>{error}</p>}
              {justBought && updateCargo &&
                <p className='fetch__success' onClick={handleError}>You successfully bought {updateCargo.units} {updateCargo.tradeSymbol} for {updateCargo.totalPrice}$ </p>
              }
              {justSold && updateCargo &&
                <p className='fetch__success' onClick={handleError}>You successfully sold {updateCargo.units} {updateCargo.tradeSymbol} for {updateCargo.totalPrice}$ </p>
              }
        </div>
    )
}

export default GoodModal;