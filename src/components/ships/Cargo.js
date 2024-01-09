import '../../style/cargo.css';
const Cargo = (props)=>{
 
    const cargo = props.stuff;
    
    const inventoryDisplay = cargo.inventory.map((invent, index)=>{
      return(
        <div key={index}>
          <p> {invent.name} </p>
          <p> x {invent.units} </p>
      </div>
      )
    });

    return(
        <>
        { cargo ? (
         <td className='cargoCard__column'>
         <div className='cargoCard__cargo'>
           <p className='cargoCard__cargo__title'>Cargo</p>
           <div className='cargoCard__cargo__progress'>
             <label htmlFor='meter'> {cargo.units} / {cargo.capacity} </label>
             <progress min="0" max={cargo.capacity} value={cargo.units} ></progress>
           </div>
           <div className='cargoCard__cargo__list'>
              { inventoryDisplay }
           </div>
         </div>
       </td>
      ) : (
        <td>
            Cargo loading...
        </td>
    )}
    </>)
}

export default Cargo;