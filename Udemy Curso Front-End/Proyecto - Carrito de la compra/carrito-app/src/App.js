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
    { name: "Tomate", price: 1.5, img:"/productos/tomates.jpg" },
    { name: "Vainas", price: 2.5, img:"/productos/vainas.jpg" },
    { name: "Lechuga", price: 0.5, img:"/productos/lechuga.jpg" },
  ],
  carro: [],
  carroVisible: false,
}

agregarAlCarro = (producto) => {
  const { carro } = this.state;

  if(carro.find(x => x.name === producto.name)) {
    const newCarro = carro.map(x => x.name === producto.name ? ({
      ...x, 
      cantidad: x.cantidad + 1
    })
    : x)
    return this.setState({ carro: newCarro })
  }

  return this.setState({
    carro: this.state.carro.concat({
      ...producto,
      cantidad: 1,
    })
  })
}

mostrarCarro = () => {
  if(!this.state.carro.length){
    return null;
  }
  this.setState({ carroVisible: !this.state.carroVisible });
}

render() {
  const { carroVisible } = this.state;
  // console.log(this.state.carro);
  return(
  <div>
    <NavBar carro={ this.state.carro } carroVisible={ carroVisible } mostrarCarro={ this.mostrarCarro } />
    <Layout>
      <Title/>
      <Productos
        agregarAlCarro={ this.agregarAlCarro }
        productos={ this.state.productos }
      />
    </Layout>
  </div>
  )
}
}

export default App;