
const ORDERS = {
    setupOrderRequest: (email, cart) => {
        const carts = cart.reduce((result, item) => {
            const newItem = {
                product_id: item.product._id,
                product_name: item.product.name,
                product_image: item.product.image,
                product_quantity: item.quantity,
                product_price: item.product.price
            }
            result.push(newItem)
            return result
        }, [])

        const orderRequest = {
            email: email,
            carts
        }
        return orderRequest
    }
}
export default ORDERS