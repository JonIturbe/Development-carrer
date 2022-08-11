//Importamos el hook useState. Si tiene use, casi siempre
//se refiere a un hook, son funciones especiales.
import { useState } from "react";
import PropTypes from "prop-types";

export const CounterApp = ( {value} ) => {
    const [ counter, setCounter ] = useState( value );

    const handleAdd = () => {
        // console.log( counter + 1 );
        // setCounter( counter + 1 );
        setCounter( (c) => c + 1);
    }

    const handleSubstract = () => setCounter( counter - 1 );
    const handleReset = () => setCounter( value );

    return(
        <>
            <div className="horizontal">
                <h1>Counter App: </h1>
                <p> { counter } </p>
            </div>
            
            <button onClick={ handleAdd }>+1</button>
            <button onClick={ handleSubstract }>-1</button>
            <button onClick={ handleReset }>Reset</button>
        </>
    );
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
}