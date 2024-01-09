import '../../style/fuel.css';
import { useAuthContext } from '../auth/authContext';

const Fuel = ({fuel})=>{
    const auth = useAuthContext();

    console.log(auth);
    console.log(auth.user);
    console.log(auth.user.credits);

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