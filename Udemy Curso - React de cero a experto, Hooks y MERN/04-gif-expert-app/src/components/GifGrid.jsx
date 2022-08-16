// import { useState, useEffect } from "react";
// import { getGifs } from "../helpers/getGifts";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifItem } from "./GifItem";

export const GifGrid = ({ category }) => {

    const { images, isLoading } = useFetchGifs( category );

    ////CODIGO SIN HOOK USEFETCHGIFS
    // const [images, setImages] = useState([]);
    // const getImages = async () => {
    //     const newImages = await getGifs( category );
    //     setImages(newImages);
    // }

    // useEffect( () => {
    //     getImages();
    //     // getGifs( category )
    //     // .then( newImages => setImages(newImages) );
    // }, [] );

    return(
        <>
            <h3>{ category }</h3>
            {
                isLoading && ( <h1>Cargando...</h1> )
            }
            
            <div className="card-grid">
                { images.map( ( img ) => (
                            <GifItem 
                                key={ img.id }
                                // title={ img.title } url={ img.url }
                                { ...img }
                            /> 
                    ))
                }
            </div>
        </>
    );
}