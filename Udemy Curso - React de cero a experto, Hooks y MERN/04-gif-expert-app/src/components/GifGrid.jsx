import { getGifs } from "../helpers/getGifts";
import { useState, useEffect } from "react";

export const GifGrid = ({ category }) => {

    const [images, setImages] = useState([]);

    const getImages = async () => {
        const newImages = await getGifs( category );
        setImages(newImages);
    }

    useEffect( () => {
        getImages();
        // getGifs( category )
        // .then( newImages => setImages(newImages) );
    }, [  ] );

    return(
        <>
            <h3>{ category }</h3>
            <ol>
                { images.map( ( { id, title } ) => (
                            <li key={ id }>{ title }</li> 
                    ))
                }
            </ol>
        </>
    );
}