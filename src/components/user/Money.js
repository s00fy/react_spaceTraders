import { useAuthContext } from '../auth/authContext';
import React from 'react';

const Money = () => {
    const auth = useAuthContext();
    const user = typeof auth.user === 'object' ? auth.user : JSON.parse(auth.user || '{}');

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