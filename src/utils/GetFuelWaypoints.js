function getFuelWaypoints(flightMode, distance) {

    let fuelCost = null;
    switch (flightMode) {
        case 'CRUISE':
            fuelCost = Math.round(distance);
            break;
        case 'DRIFT':
            fuelCost = 1;
            break;
        case 'BURN':
            fuelCost = 2 * Math.round(distance);
            break;
        case 'STEALTH':
            fuelCost = Math.round(distance);
            break;
        default:
            fuelCost = Math.round(distance);
            break;
    }
    return(fuelCost);
}

export default getFuelWaypoints;
