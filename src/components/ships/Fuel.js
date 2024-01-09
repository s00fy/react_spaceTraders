const Fuel = (props)=>{

    const Fuel = props.fuel;

    return(
        <>
        { Fuel ? (
        <td className='fleetTable__column'>
        <div className='fleetTable__fuel'>
          <p className='fleetTable__fuel__title'>Fuel</p>
          <div className='fleetTable__fuel__progress'>
            <div className="semi-donut margin" /* style="--percentage :20; --fill: #FF3D00 ;" */>
            {Fuel.current}
            </div>
          </div>
          <div className='fleetTable__fuel__list'>
              
          </div>
        </div>
      </td>
      ) : (
        <td>
        Fuel loading...
        </td>
    )}
    </>)
}

export default Fuel;