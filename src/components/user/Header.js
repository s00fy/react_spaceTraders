import { Link, useNavigate } from 'react-router-dom';
import '../../style/header.css';
import Money from './Money';

const Header = () => {
    const navigate = useNavigate();
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
        navigate('/');
    }

    return(
        <nav className='navbarContainer'>
            <ul className='navbar'>
                <li className='navbar__item'>
                    <Link to={"/fleet"} className='navbar__link'>
                        <img src="./img/icons/spaceship.svg" className='navbar__icon' alt="link to fleet" />
                    </Link>
                </li>
                <li className='navbar__item'>
                    <Link className='navbar__link' to={"/navigation"}>
                        <img src="./img/icons/navigation.svg" className='navbar__icon' alt="link to navigation" />
                    </Link>
                </li>
                <li className='navbar__item'>
                    <Link className='navbar__link' to={"/"}>
                        <img src="./img/icons/rover.svg" className='navbar__icon' alt="link to mining resources" />
                    </Link>
                </li>

                <li className='navbar__item'>
                    <Link className='navbar__link navbar__user' to={"/user"}>
                        <Money />
                        <img src="./img/icons/astronaut.svg" className='navbar__icon' alt="link to user profile" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;