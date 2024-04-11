import {useEffect, useState} from 'react'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [menuList, setMenuList] = useState([])
  const [activeMenuId, setActiveMenuId] = useState('')
  const [cartList, setCartList] = useState([])

  const getApiDetails = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      if (data && data.length > 0) {
        const menuList1 = data[0].table_menu_list.map(item => ({
          categoryDishes: item.category_dishes.map(item1 => ({
            addonCat: item1.addonCat,
            dishType: item1.dish_Type,
            dishCalories: item1.dish_calories,
            dishCurrency: item1.dish_currency,
            dishDescription: item1.dish_description,
            dishAvailability: item1.dish_Availability,
            dishId: item1.dish_id,
            dishImage: item1.dish_image,
            dishName: item1.dish_name,
            dishPrice: item1.dish_price,
          })),
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          menuCategoryImage: item.menu_category_image,
        }))
        setMenuList(menuList1)
        setActiveMenuId(menuList1[0].menuCategoryId)
        setIsLoading(false)
      } else {
        throw new Error('Empty response data')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApiDetails()
  }, [])

  const addCartItem = dish => {
    const existingItem = cartList.find(item => item.dishId === dish.dishId)
    if (!existingItem) {
      const updatedCart = [...cartList, {...dish, quantity: 1}]
      setCartList(updatedCart)
    } else {
      const updatedCart = cartList.map(item =>
        item.dishId === dish.dishId
          ? {...item, quantity: item.quantity + 1}
          : item,
      )
      setCartList(updatedCart)
    }
  }

  const deleteCartItem = dish => {
    const existingItem = cartList.find(item => item.dishId === dish.dishId)
    if (existingItem && existingItem.quantity === 1) {
      const updatedCart = cartList.filter(item => item.dishId !== dish.dishId)
      setCartList(updatedCart)
    } else {
      const updatedCart = cartList.map(item =>
        item.dishId === dish.dishId
          ? {...item, quantity: item.quantity - 1}
          : item,
      )
      setCartList(updatedCart)
    }
  }

  const onMenuTabClick = id => {
    setActiveMenuId(id)
  }

  const renderSpinner = () => (
    <div className='spinner-container'>
      <div className='spinner-border' role='status' />
    </div>
  )

  const renderMenuTabs = () => (
    <ul className='menu-tab-container'>
      {menuList.map(item => {
        const classNewName =
          item.menuCategoryId === activeMenuId ? 'active-class' : 'normal-class'
        return (
          <li
            className='menu-tab'
            onClick={() => onMenuTabClick(item.menuCategoryId)}
            key={item.menuCategoryId}
          >
            <button className={`${classNewName} tab-button`} type='button'>
              <p className='menu-name'>{item.menuCategory}</p>
            </button>
          </li>
        )
      })}
    </ul>
  )

  const renderDishes = () => (
    <>
      {menuList.map(
        item =>
          item.menuCategoryId === activeMenuId && (
            <ul key={item.menuCategoryId} className='dishes-list-container'>
              {item.categoryDishes.map(dish => (
                <DishItem
                  key={dish.dishId}
                  item={dish}
                  cartList={cartList}
                  addCartItem={addCartItem}
                  deleteCartItem={deleteCartItem}
                />
              ))}
            </ul>
          ),
      )}
    </>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <>
      <Header cartList={cartList} />
      {renderMenuTabs()}
      {renderDishes()}
    </>
  )
}

export default Home
