import DateFormat from "../../utils/DateFormat";

const RouteDetails = ({nav}) => {

    console.log(nav);
    return(
        <>
        { nav.nav.route ?
            <div className="fetch__success notif">
                <p>You've get into the galaxy at {DateFormat(nav.nav.route.departureTime)}</p>
                <p>You will arrive at {DateFormat(nav.nav.route.arrival)}</p>
            </div> : <p className="fetch__success notif"> The ship is navigating...</p>
        }
        </>
    )
    
}

export default RouteDetails;