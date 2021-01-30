import '../styles/Cart.scss'
import { BsFillTrashFill } from 'react-icons/bs'
const Cart = ({ shoppingCart, setShoppingCart }) => {
  console.log(shoppingCart.cartItems)
  const updateQuantity = (target, index) => {
    setShoppingCart({
      cartItems: shoppingCart.cartItems.map((x, i) =>
        i === index ? { ...x, qty: +target.value } : x
      ),
    })
  }

  const removeProductFromCart = product => {
    setShoppingCart({
      cartItems: shoppingCart.cartItems.filter(
        item => item.product !== product.product
      ),
    })
  }

  return (
    <section className='cart-section'>
      <h1 className='title'>Cart</h1>
      <div className='products'>
        {!shoppingCart.cartItems.length ? (
          <h1>There are no items in your cart</h1>
        ) : (
          <>
            {shoppingCart.cartItems.map((item, index) => (
              <div className='item' key={item.product}>
                <div className='product-img'>
                  <img src={item.path} alt={item.product} />
                </div>
                <h2 className='product-name'>{item.product}</h2>
                <div className='product-qty'>
                  <span>Quantity: </span>
                  <select
                    value={item.qty}
                    min={1}
                    onChange={({ target }) => updateQuantity(target, index)}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 9, 10].map(number => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                <p className='product-total-price'>
                  Total: <span>£{(item.price * item.qty).toFixed(2)}</span>
                </p>
                <button
                  className='delete-btn'
                  onClick={() => removeProductFromCart(item)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <h2 className='total'>
        Total: £
        {shoppingCart.cartItems
          .reduce((a, b) => a + b.qty * b.price, 0)
          .toFixed(2)}
      </h2>
    </section>
  )
}

export default Cart
