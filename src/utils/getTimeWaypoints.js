import React, { useState, useEffect } from 'react';

const GetTimeWaypoints = ({flight, dist, speed}) => {
  const [navMultiplier, setNavMultiplier] = useState('');
  const [secondsTravelled, setSecondsTravelled] = useState(0);

  const attributeNavMultiplier = (flight) => {
    switch (flight) {
        case 'CRUISE':
            setNavMultiplier(25);
            break;
        case 'DRIFT':
            setNavMultiplier(250);
            break;
        case 'BURN':
            setNavMultiplier(12.5);
            break;
        case 'STEALTH':
            setNavMultiplier(30);
            break;
        default:
            setNavMultiplier(25);
            break;
    }
  }

  const getTravelTime = (dist, multiplier, speed) => {
    setSecondsTravelled(Math.round(Math.round(Math.max(1, dist)) * (multiplier / speed) + 15));
  }

  useEffect(() => {
    // calculateSecondsTravelled();
    attributeNavMultiplier(flight);
    getTravelTime(dist, navMultiplier, speed)
  }, [ dist, speed, flight, navMultiplier]);

  return (
    <p className='timeTravel'>{secondsTravelled}s </p>
  );
};

export default GetTimeWaypoints;
