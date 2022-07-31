import { Component } from "react";
import Productos from "./components/Productos";
import Layout from "./components/Layout";
import Title from "./components/Title";
import NavBar from "./components/NavBar";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {

state = {
  productos: [
    { name: "Tomate", price: 1500, img:"/productos/tomates.jpg" },
    { name: "Vainas", price: 2500, img:"/productos/vainas.jpg" },
    { name: "Lechuga", price: 500, img:"/productos/lechuga.jpg" },
  ]
}

  render() {
    return(
    <div>
      <NavBar />
      <Layout>
        <Title/>
        <Productos
          agregarAlCarro={ () => console.log("Aun no hace nada") }
          productos={ this.state.productos }
        />
      </Layout>
    </div>
    )
  }
}

export default App;