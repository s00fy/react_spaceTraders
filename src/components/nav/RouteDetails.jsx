import React from 'react';
import DateFormat from "../../utils/DateFormat";
import { useState } from "react";

const RouteDetails = ({nav}) => {

    const [navInfo, setNavInfo] = useState(nav);

    const handlePopup = () => {
        setNavInfo(null);
    };

    return(
        <>
        { navInfo && navInfo.nav.route ?
            <div className="fetch__success notif" onClick={handlePopup}>
                <p>You&apos;ve get into the galaxy at {DateFormat(navInfo.nav.route.departureTime)}</p>
                <p>You will arrive at {DateFormat(navInfo.nav.route.arrival)}</p>
                <p>You consumed {navInfo.fuel.consumed.amount} fuel unit </p>
            </div> : null
        }
        </>
    )
    
}

export default RouteDetails;