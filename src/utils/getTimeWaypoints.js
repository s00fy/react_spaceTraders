import React, { useState, useEffect } from 'react';

const GetTimeWaypoints = ({flight, dist, speed}) => {
  const [navMultiplier, setNavMultiplier] = useState('');
  const [distance, setDistance] = useState(dist);
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
  }, [ dist, speed, flight]);

  return (
    <div>
      <p>The ship will take {secondsTravelled} seconds to travel.</p>
    </div>
  );
};

export default GetTimeWaypoints;
