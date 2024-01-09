import { useState, useRef, useCallback } from "react";

const GoodModal = ({good, shipSymbol}) => {
    const [isSending, setIsSending] = useState(false);
    const unitRef = useRef(1);
    const token = localStorage.getItem("token");
    
    const sendRequest = useCallback(async () => {
        console.log(isSending);
        if (isSending) return;
        setIsSending(true);
        
        const units = parseInt(unitRef.current.value);
        console.log(units);
        
        console.log('sendRequest working');

      const options = {
          method: "POST",
          endpoint: `my/ships/${shipSymbol}/purchase`,
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
          console.log('fecth request');
          console.log(data);
        } catch (error) {
          console.error('Error fetching goods info:', error);
        }
      setIsSending(false);
    }, [isSending])

    return(
        <div className="goodModal">
          <p className="goodModal__title"> You want to deal {good.symbol}</p>
          <input ref={unitRef} type="number" defaultValue="1" min="1" max={good.tradeVolume} className="goodModal__input"/>
          <div className="goodModal__btns">
            <button className="goodModal__btn" disabled={isSending} onClick={sendRequest}>Buy</button>
            <button className="goodModal__btn">Sell</button>
          </div>
        </div>
    )
}

export default GoodModal;