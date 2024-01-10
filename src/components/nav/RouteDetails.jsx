import DateFormat from "../../utils/DateFormat";

const RouteDetails = ({nav}) => {

    console.log(nav);
    return(
        <>
            <p>You've get into the galaxy at {DateFormat(nav.route.departureTime)}</p>
            <p>You will arrive at {DateFormat(nav.route.arrival)}</p>
        </>
    )
    
}

export default RouteDetails;