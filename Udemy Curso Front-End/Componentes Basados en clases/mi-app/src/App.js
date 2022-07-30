import { Component } from "react";

class Button extends Component {
    state = {}
    constructor(props){
        super(props);
        console.log("constructor: ", props);
    }

    componentDidMount(){
        console.log("component did mount");
    }

    componentDidUpdate(prevProps, prevState){
        console.log("component did update", prevProps, prevState);
    }

    componentWillUnmount(){
        console.log("Desmontando componente");
    }

    render(){
        console.log("Ejecutando render de button");
        return(<button onClick={() => this.setState({ prop : 1 })}>
            Enviar
            </button>)
    }
}

class Input extends Component {
    // state = {
    //     valor: ""
    // }

    // handleChange = (value) => {
    //     this.setState({ valor :  value });
    // }
    render(){
        return (
            <input
            value={ this.props.value }
            onChange={ this.props.onChange }
            />
        )
    }
}

class App extends Component {

    state = {
        nombre: "",
        apellido: "",
    }

    //Una manera de hacer que this no pierda el contexto y poder usar funciones en lugar de 
    //propiedades. Hacemos un binding en el constructor, donde pasamos this al metodo
    // constructor(props) {
    //     super(props);
    //     this.updateNombre = this.updateNombre.bind(this);
    // }

    updateNombre(v) {
        this.updateValues("nombre", v.target.value);
    }

    //Metodo que actualiza los valores del estado
    updateValues = (prop, value) => {
        //Utilizamos propiedades dinamicas, por lo que [prop] sera el identificador
        //si le pasamos nombre, actualizara el nombre
        this.setState({ [prop]: value })
    }

    render() {
        return (
            <div>
                <p>Nombre Completo: {this.state.nombre} {this.state.apellido}
                <Input 
                    value = { this.state.nombre } 
                    // onChange={ e => this.updateValues("nombre", e.target.value) }
                    onChange={ (arg) => this.updateNombre(arg) }
                />
                <Input 
                    value = { this.state.apellido } 
                    //e.target.value es el valor que tiene el campo en ese mismo momento
                    onChange={ e => this.updateValues("apellido", e.target.value) }    
                />
                </p>
            </div>
        )
    }
}

// class App extends Component {
//     //Definimos la propiedad de estado. state debe llamarse asi, pues es una propiedad
//     //de Component y para modificarla debemos extender de ella. Si no lo llamamos asi, 
//     //no funcionará ni la declaracion, ni el metodo setState 
//     state = {
//         valor: 3
//     }

//     //render() se ejecuta siempre que el estado del componente haya cambiado o cuando el metodo render de 
//     //un componente padre ha sido llamado, por lo que los componentes hijos tambien llaman a render()
//     //Es un metodo obligatorio. Todos los componentes deben tener un metodo render.
//     render() {
//         console.log(this.state);
//         return (
//             <div>
//                 <p>Hola mundo</p>
//                 {this.state.valor === 3
//                     ? <Button puto="gay"/>
//                 : null}
//                 <button 
//                 className={this.state.valor}
//                 onClick={() => this.setState({ valor : 2 })}>
//                     Enviar en App
//                 </button>
//             </div>
//         )
//     }
// }

export default App;