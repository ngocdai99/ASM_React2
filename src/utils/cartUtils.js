
"use strict"
const CART = {
        getTotal: (cart) => {
            return cart.reduce((result, item) => {
                return result += item.quantity * item.product.price
            }, 0)
        },
        addToCart: (cart, setCart, product) => {
            // Tìm chỉ số của sản phẩm trong giỏ hàng
            const index = cart.findIndex(item => {
                return item.product._id == product._id
            });

            if (index > -1) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                let newCart = cart.map((item, i) => {
                    if (i === index) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })

                setCart(newCart)
            } else {
                // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
                setCart([...cart, { product: product, quantity: 1 }])
            }

            console.log('---------------------')
        },
        handlePlus: (cart, setCart, item) => {
            const newCart = cart.map((cartItem) => {
                if (cartItem.product._id == item.product._id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                }
                return cartItem
            })
            setCart(newCart)
        },

        handleMinus: (cart, setCart, item) => {
            const newCart = cart.reduce((result, cartItem) => {
                if (cartItem.product._id == item.product._id) {
                    if (cartItem.quantity > 1) {
                        result.push({ ...cartItem, quantity: cartItem.quantity - 1 })
                    }
                } else {
                    result.push(cartItem)
                }
                return result
            }, [])
            setCart(newCart)
        }
    
}

export default CART;