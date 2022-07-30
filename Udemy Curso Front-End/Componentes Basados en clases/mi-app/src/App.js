import { Component } from "react";

class Button extends Component {
    render(){
        console.log("Ejecutando render de button");
        return(<button>Enviar</button>)
    }
}

class App extends Component {
    //Definimos la propiedad de estado. state debe llamarse asi, pues es una propiedad
    //de Component y para modificarla debemos extender de ella. Si no lo llamamos asi, 
    //no funcionará ni la declaracion, ni el metodo setState 
    state = {}

    //render() se ejecuta siempre que el estado del componente haya cambiado o cuando el metodo render de 
    //un componente padre ha sido llamado, por lo que los componentes hijos tambien llaman a render()
    //Es un metodo obligatorio. Todos los componentes deben tener un metodo render.
    render() {
        console.log(this.state);
        return (
            <div>
                <p>Hola mundo</p>
                <Button/>
                <button 
                className={this.state.valor}
                onClick={() => this.setState({ valor : 2 })}>
                    Enviar en App
                </button>
            </div>
        )
    }
}

export default App;