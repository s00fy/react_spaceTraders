import '../../style/fuel.css';
import { useState } from 'react';
import React from 'react';

const Fuel = ({fuel, shipSymbol})=>{
  const [error, setError] = useState(null);
  const [successRefuel, setSuccessRefuel] = useState(null);
  const token = localStorage.getItem('token');

  const clickHandlerRefuel = async () => {
      const options = {
        method: "POST",
        endpoint: `my/ships/${shipSymbol}/refuel`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        }else{
          setSuccessRefuel(data.data.transaction);
        }
      } catch (error) {
        console.error('Error fetching Refuel info:', error);
      }
    }

    const handleError = () => {
      setError(null);
      setSuccessRefuel(null);
    }

    return(
        <>
        { fuel ? (
        <>
        <div className='fuel__card'>
          <p className='fuel__title'>Fuel</p>
          <div className='fuel__progress'>
            <label htmlFor='meter'> {fuel.current} / {fuel.capacity} </label>
            <progress min="0" max={fuel.capacity} value={fuel.current} ></progress>
          </div>
          <div className='refuel'>
            <button className='refuel__btn' onClick={clickHandlerRefuel}>Refuel</button>
            <p className='refuel__tooltip' >You need to be in a marketplace AND docked in order to be able to refuel</p>
          </div>

          {error && <p className='fetch__error' onClick={handleError}>{error}</p>}
          {successRefuel && <p className='fetch__success' onClick={handleError}> You successfully bought {successRefuel.units} fuels for {successRefuel.totalPrice}$ </p>}
        </div>
      </>
      ) : (
        <>
        Fuel loading...
        </>
    )}
    </>)
}

export default Fuel;