import { useState, useEffect } from 'react';
import Ship from "./Ship";
import Header from "../user/Header";
// import { useAuthContext } from '../auth/authContext';
// import { useNavigate } from 'react-router-dom';
import '../../style/fleet.css';

const ShipRender = () => {
  // const auth = useAuthContext();
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [shipsRender, setShipsRender] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      try {
        const response = await fetch('https://api.spacetraders.io/v2/my/ships', options);
        const data = await response.json();
        setShipsRender(data.data);
      } catch (error) {
        console.error('Error fetching ships info:', error);
      }
    };

    fetchData();
  }, [token]);

    const shipsDisplay = shipsRender.map((ship, index) =>{
    return (
      <Ship key={index} ship ={ship} />
    );
  });

    return (
      <>
          <Header />
          
        <div className='content__ship container__content'>
        <h1 className='title'>Fleet</h1>
        {shipsRender ? (
            <table className='fleetTable'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Stuff</th>
                    <th>Fuel</th>
                    <th className='fleetTable__lastColumn'></th>
                  </tr>
                </thead>
                <tbody>
                  {shipsDisplay}
                </tbody>
            </table>
        ) : (
            <p>Analyzing your spaceships...</p>
        )}
        </div>
        </>
    );
};

export default ShipRender;