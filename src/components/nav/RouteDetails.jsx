// import { useState } from "react";

const RouteDetails = ({nav}) => {
    // const[isTransitionning, setIsTransitionning] = useState(true);

    

    console.log(nav);
    return(
        <>
            <p>You've get into the galaxy at {nav.route.departureTime}</p>
            <p>You will arrive at {nav.route.arrival}</p>
        </>
    )
    
}

export default RouteDetails;