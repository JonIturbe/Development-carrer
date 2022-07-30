import { Component } from "react";

class App extends Component {
    //Definimos la propiedad de estado
    state = {}
        
    //render() se ejecuta siempre que el estado del componente haya cambiado o cuando el metodo render de 
    //un componente padre ha sido llamado, por lo que los componentes hijos tambien llaman a render()
    render() {
        console.log(this.state);
        return (
            <div>
                <p>Hola mundo</p>
                <button 
                className={this.state.valor}
                onClick={() => this.setState({ valor : 2 })}>
                    Enviar
                </button>
            </div>
        )
    }
}

export default App;