import { useState, useEffect } from 'react';
import calculateDistance from '../../utils/getDistanceWaypoints';
import GetTimeWaypoints from '../../utils/getTimeWaypoints';
import '../../style/systemwp.css';

const SystemWaypoints = ({systemSymbol, status, shipSymbol, shipX, shipY, flightMode, speed }) => {

  const [waypointsList, setWaypointsList] = useState([]);
  const token = localStorage.getItem("token");
  const theShipSymbol = shipSymbol;
  const flight =flightMode;
  const [error, setError] = useState(null);

  useEffect(() => {

      const fetchData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        parameters: {
          limit: '20',
        },
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20`, options);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        }
        setWaypointsList(data.data);
        
      } catch (error) {
        console.error('Error fetching system waypoints info:', error);
      }
    };
    

    fetchData();
  }, [systemSymbol, status, setError, token]);

  const handleError = () => {
    setError(null);
  }

  const waypointsDisplay = waypointsList.map((waypoints, index) =>{
    return (
      <div  key={waypoints.symbol} className='sysWp' >
      {
        waypoints.traits ? 
        <div className='sysWp__container'>
          <div className='sysWp__id'>
            <p className='sysWp__title'>{ waypoints.symbol }</p>
            <GetTimeWaypoints speed={speed} flight={flight} dist={ calculateDistance(shipX, shipY, waypoints.x, waypoints.y ) } />
          </div>
          <p className='sysWp__type'>{ waypoints.type }</p>
          <p className='sysWp__dist'>dist : { calculateDistance(shipX, shipY, waypoints.x, waypoints.y ) }</p>
          {waypoints.traits.map(trait => (
            <p className='sysWp__traits' key={trait.symbol}>
              {trait.symbol}
            </p>
          ))}
          <button onClick={()=>navigate(waypoints.symbol)} className='sysWp__cta' >Navigate to the waypoint →</button>
        </div>
        :
        <p>
        scanning waypoints...
        </p>
      }
      </div>
    );
    })

    const navigate = async (symbol) => {
      const options = {
        endpoint: `my/ships/${theShipSymbol}/navigate`,
        method: 'POST',
        body: JSON.stringify({
          "waypointSymbol": symbol,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        }
      } catch (error) {
        console.error('Error fetching navigate info:', error);
      }
    }


    return (
      <>
       {waypointsList ? (
        <>
          <div className='system__infos' >You can only extract resources in : ASTEROID, ENGINEERED_ASTEROID, ASTEROID_BASE</div>
          {error && <p className='fetch__error' onClick={handleError}>{error}</p>}
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
