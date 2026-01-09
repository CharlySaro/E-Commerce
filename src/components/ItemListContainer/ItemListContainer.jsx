const ItemListContainer = ({ prop1, prop2, funcBienvenida }) => {

  return (
    <div>
      <h2>{prop1}</h2>
      <h2>{prop2}</h2>
      <button onClick={funcBienvenida} >Click para la bienvenida</button>
    </div>
  )
}

export default ItemListContainer