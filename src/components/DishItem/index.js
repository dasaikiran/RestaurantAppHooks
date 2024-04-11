import React, {useState} from 'react'
import './index.css'

const DishItem = ({item, cartList, addCartItem, deleteCartItem}) => {
  const {
    addonCat,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishAvailability,
    dishId,
    dishImage,
    dishName,
    dishPrice,
  } = item

  const [quantity, setQuantity] = useState(0)

  React.useEffect(() => {
    const cartItem = cartList.find(item1 => item1.dishId === dishId)
    setQuantity(cartItem ? cartItem.quantity : 0)
  }, [cartList, dishId])

  const onMinusClick = () => {
    deleteCartItem(item)
  }

  const onPlusClick = () => {
    addCartItem(item)
  }

  const renderButtonContainer = () => (
    <div className="button-container">
      <button onClick={onMinusClick} className="minus-button" type="button">
        -
      </button>
      <p className="value">{quantity}</p>
      <button onClick={onPlusClick} className="plus-button" type="button">
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item">
      <div className={`type-${dishType}-border`}>
        <div className={`type-${dishType}-circle`} />
      </div>
      <div className="dish-des-container">
        <h1 className="dish-name">{dishName}</h1>

        <p className="dish-cur">
          {dishCurrency} {dishPrice}
        </p>

        <p className="dish-desc">{dishDescription}</p>
        {dishAvailability && renderButtonContainer()}
        {!dishAvailability && <p className="not-available">Not available</p>}
        {addonCat.length > 0 && (
          <p className="add-ons">Customizations available</p>
        )}
      </div>

      <p className="calories">{dishCalories} calories</p>

      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default DishItem
