import { useAuthContext } from '../auth/authContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './../../style/user.css';

const UserInfo = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  // Check if auth.user is already an object or parse it as JSON
  const user = typeof auth.user === 'object' ? auth.user : JSON.parse(auth.user || '{}');

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <>
      <Header />
    <div className='user__container container__content'>
      <div className='user__card'>
      <h1 className='title user__title'>User Info</h1>
      {user ? (
        <div className='user__infos'>
          <p>Username: {user.symbol}</p>
          <p>Credits: {user.credits}</p>
          <p>Headquarters: {user.headquarters}</p>
          <p>ShipCount: {user.shipCount}</p>
          <p>startingFaction: {user.startingFaction}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
      </div>

    </div>
    </>
  );
};

export default UserInfo;