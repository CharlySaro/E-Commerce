import CartWidget from "../CartWidget/CartWidget"

const NavBar = () => {
  return (
    <nav className="nav">
      
      <div className="nav-brand" >
        <img src="" alt="" />        
      </div>

      <ul>
        <li>Nakeds</li>
        <li>Deportivas</li>
        <li>Enduro</li>
      </ul>

      <CartWidget />
    </nav>
  )
}

export default NavBar