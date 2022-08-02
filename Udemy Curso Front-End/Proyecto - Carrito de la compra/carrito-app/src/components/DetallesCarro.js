import { Component } from "react";

const styles = {
    detallesCarro: {
        backgroundColor: "#fff",
        position: "absolute", 
        marginTop: "30px",
        boxShadow: "1px 5px 5px rgb(0, 0, 0, 0.3)",
        borderRadius: "5px",
        width: "300px",
        right: 50,
    },
    ul: {
        margin: 0,
        padding: 0,
    },
    producto: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 20px",
        borderBottom: "solid 1px #aaa",

    },
}

const mostrarDetallesCarro = (elm) => {
    return(
        <li style={styles.producto} key={elm.name}>
            <img alt={elm.name} src={elm.img} width="50" height="32" />
            {elm.name} <span>{elm.cantidad}</span>
        </li> )
}

const precioTotal = (carro) => {
    let totalPrice = 0;
    carro.map(elm => totalPrice += elm.price*elm.cantidad )
    return(
        totalPrice
    )
}

class DetallesCarro extends Component {
    render() {
        const { carro } = this.props;
        let total = precioTotal(carro);
        return(
            <div style={styles.detallesCarro}>
                <ul style={styles.ul}>
                    { carro.map(elm => mostrarDetallesCarro(elm)) }
                    <li style={styles.producto} key="Total">
                        Total: <span>{ total }€</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DetallesCarro;