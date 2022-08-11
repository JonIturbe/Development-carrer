//Esto vienen instalado por defecto con CRA, pero con VITE 
//hay que instalarlo manualmente con:
//yarn add prop-types
import PropTypes from "prop-types";

const newMessage = "Mensaje de texto";

const user = {
    uid: "001",
    nickname: "PrimeritoUsuario",
    password: "pole",
};

const getResult = () => {
    return 342 + 18;
}

export const FirstApp = ( {title, num} ) => {

    return(
        <>
            <h1>Nombre del programador: </h1>
            <p>Jon Iturbe</p>
            <p> { newMessage } </p>
            <code> { JSON.stringify(user) } </code>
            <p> { getResult() } </p>
            <h1> { title } </h1>
            <p> { num } </p>
        </>
    );
}

FirstApp.propTypes = {
    //title debe ser un string y es un campo obligatorio
    //Si no le pasamos un string, aunque funcionara, lanzara un error de type
    title: PropTypes.string.isRequired
}

FirstApp.defaultProps = {
    num: "default"
}