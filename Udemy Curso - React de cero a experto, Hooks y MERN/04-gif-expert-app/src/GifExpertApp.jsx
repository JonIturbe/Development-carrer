import { useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";

export const GifExpertApp = () => {

    //Cuando quieras almacenar info que cambie el html, necesitas un hook
    const [categories, setCategories] = useState( [ "One Punch Man"] );
    
    const onAddCategory = (newCategory) => {

        if ( categories.includes(newCategory) ) return;

        setCategories( [newCategory, ...categories] );
        // setCategories( cat => [ ...cat, "Valorant" ] );
    }

    return(
        <>
            <h1>Gif Expert App</h1>
            
            <AddCategory 
                // setCategories={ setCategories } 
                onNewCategory={ value => onAddCategory(value) }
            />

            {/* <button onClick={ onAddCategory }>Agregar</button> */}
            { categories.map( ( cat ) => (
                    // <div key={ cat }>
                    //     <li>{ cat }</li> 
                    // </div>

                    <GifGrid key={ cat } category={ cat } />
                ))
            }
        </>
    );
}