import { useState, useEffect } from 'react';
import calculateDistance from '../../utils/getDistanceWaypoints';
import GetTimeWaypoints from '../../utils/getTimeWaypoints';

const SystemWaypoints = ({systemSymbol, shipLocation, status, shipSymbol, shipX, shipY, flightMode, speed }) => {

  const [waypointsList, setWaypointsList] = useState([]);
  const token = localStorage.getItem("token");
  const theShipSymbol = shipSymbol;
  const flight =flightMode;

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints`, options);
        const data = await response.json();
        setWaypointsList(data.data);
      } catch (error) {
        console.error('Error fetching system waypoints info:', error);
      }
    };

    fetchData();
  }, [systemSymbol, status, token]);

  const waypointsDisplay = waypointsList.map((waypoints) =>{
    return (
      <>
      {
        waypoints.traits ? 
        <div key={waypoints.symbol} >
        <p>{ waypoints.symbol }</p>
        <p>{ waypoints.type }</p>
        <p>dist : { calculateDistance(shipX, shipY, waypoints.x, waypoints.y ) }</p>
        <GetTimeWaypoints speed={speed} flight={flight} dist={ calculateDistance(shipX, shipY, waypoints.x, waypoints.y ) } />
        <p>time to get there :  </p>
        {waypoints.traits.map(trait => (
          <p key={trait.symbol}>
            {trait.symbol}
          </p>
        ))}

        <button onClick={()=>navigate(waypoints.symbol)}>Navigate to the waypoint →</button>
        </div>
        :
        <p>
        scanning waypoints...
        </p>
      }
      </>
    );
    })

    const navigate = async (symbol) => {
      const options = {
        endpoint: `my/ships/${theShipSymbol}/navigate`,
        method: 'POST',
        body: JSON.stringify({
          'waypointSymbol': `${symbol}`,
        }),
        parameters: {
          limit: '20',
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching navigate info:', error);
      }
    }


    return (
      <>
       {waypointsList ? (
        <>
          <p className='system'>{systemSymbol}</p>
          <div className='system__list'>{waypointsDisplay}</div>
        </>
        ) : (
          <p>Scanning the galaxy...</p>
        )
      }
        </>
    );
};

export default SystemWaypoints;
