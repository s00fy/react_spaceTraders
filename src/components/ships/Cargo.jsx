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
         <>
         <div className='cargoCard'>
           <p className='cargoCard__title'>Cargo</p>
           <div className='cargoCard__progress'>
             <label htmlFor='meter'> {cargo.units} / {cargo.capacity} </label>
             <progress min="0" max={cargo.capacity} value={cargo.units} ></progress>
           </div>
           <div className='cargoCard__list'>
              { inventoryDisplay }
           </div>
         </div>
       </>
      ) : (
        <>
            Cargo loading...
        </>
    )}
    </>)
}

export default Cargo;