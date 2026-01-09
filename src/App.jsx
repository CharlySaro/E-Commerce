import './App.css'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';


function App() {
  
  const funcBienvenida = () => {
    alert("Hola, bienvenido a mi tienda de motos !!!");
  }

  return (
    <div>
      <NavBar />
      <ItemListContainer prop1={"Este es un ejemplo de la propiedad 1"} prop2={"Este es un ejemplo de la propiedad 2"} funcBienvenida={funcBienvenida} />
    </div>
  )
}

export default App
