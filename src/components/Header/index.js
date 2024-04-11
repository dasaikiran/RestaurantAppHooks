// Header.js
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = ({cartList}) => {
  const count = cartList.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <nav className="navbar">
      <h1 className="nav-heading">UNI Resto Cafe</h1>
      <div className="nav-container">
        <h1 className="my-orders-heading">My Orders</h1>
        <AiOutlineShoppingCart className="cart-icon" />
        <div className="cart-value">
          <span className="span">{count}</span>
        </div>
      </div>
    </nav>
  )
}

export default Header
