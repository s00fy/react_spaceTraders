import '../../style/fuel.css';

const Fuel = (props)=>{

    const Fuel = props.fuel;

    return(
        <>
        { Fuel ? (
        <td className='fuel'>
        <div className='fuel__card'>
          <p className='fuel__title'>Fuel</p>
          <div className='fuel__progress'>
            <div className="semi-donut margin" /* style="--percentage :20; --fill: #FF3D00 ;" */>
            {Fuel.current}
            </div>
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