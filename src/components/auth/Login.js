import '../../style/login.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from './authContext';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loggedInMessage, setLoggedInMessage] = useState(false);

    const auth = useAuthContext();
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        auth.login(token);
        if (auth.userToken === token) {
            setErrorMessage(null);
            navigate('/fleet');
        }
        if (auth.userToken !== token){
            setErrorMessage("Please enter a valid token");
        }
    };

    useEffect(() => {
        const loggedIn = () => {
            let storedToken = localStorage.getItem("token");
            auth.login(storedToken);
            if (auth.isValid === true ) {
                setLoggedInMessage(true);
                navigate('/fleet');
            } else {
                setLoggedInMessage(false);
            }
        };
    
        loggedIn();
    }, [auth]);

  return (
    <div>
      <h1 className='loginTitle'>✼ Cosmic Odyssey ✼</h1>
      <div className="containerLogin">
        <h2>Explore. Excavate. Expand.</h2>
        <form>
            <label htmlFor="token">Your token :
            </label>
            <div className="formWrapper">
                <input id="token" type="text" onChange={(e) => setToken(e.target.value)} name="token" placeholder="Get started ..."></input>
                <button onClick={handleLogin} type="submit">Go →</button>
            </div>
            {errorMessage && <p className='errorLogin'>{errorMessage}</p>}
            {loggedInMessage === true ? 
                <p className='loggedIn'>It seems like you're already logged in ? 
                <Link to={"/fleet"} className='loggedIn__link link'>Continue →</Link>
                </p> : null
            }
        </form>
      </div>
    </div>
  );
};

export default Login;
