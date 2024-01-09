import { useAuthContext } from '../auth/authContext';

const Money = () => {
    const auth = useAuthContext();
    const user = auth.user;

    return(
        <>
        {auth.user ?
            <span className="tooltip"> Money : {user.credits} </span>
            : 
            <span className="tooltip"> Money : counting coins... </span>
          }
        </>
        )
}

export default Money;