import AxiosInstance from "../helpers/AxiosInstance"

const BookAPIHelper = {
    register: async (registerRequest) => {
        try {
            const { email, name, password } = registerRequest
            const body = {
                email: email,
                name: name,
                password: password,
            }

            const response = await AxiosInstance().post('register.php', body)
            if (response.status == true) {
                return true;
            }

        } catch (error) {
            console.log(error)
            return Promise.reject(error)

        }
    },

    login: async (loginRequest) => {
        try {
            const { email, password } = loginRequest
            const body = {
                email: email,
                password: password,
            }

            const response = await AxiosInstance().post('login.php', body)

            console.log(response)
            return response

        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    },

    getCategories: async () => {
        try {
            const response = await AxiosInstance().get('list-category.php')
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    },

    getProductByCategory: async (categoryId) => {
        try {
            const response = await AxiosInstance()
                .get(`list-product-by-cate.php?id=${categoryId}`)
            // list-product-by-cate.php?id=2
            return response

        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    },

    // getOrderHistory: async (getHistoryRequest) => {
    //     try {
    //         const response = await AxiosInstance()
    //             .post('/users/login', getHistoryRequest)
    //         console.log(response)
    //         if (response.status == true) {
    //             return response.user.carts.reverse()
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         return Promise.reject(error)
    //     }
    // },

    // updateProfile: async (updateProfileRequest) => {
    //     try {
    //         const response = await AxiosInstance()
    //             .post(`/users/update-profile`, updateProfileRequest)

    //         if (response.status == true) {
    //             return true
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         return Promise.reject(error)
    //     }
    // },



    // getProductDetail: async (productId) => {
    //     try {
    //         const response = await AxiosInstance()
    //             .get(`/products/${productId}`)

    //         if (response.status == true) {
    //             return response.product
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         return Promise.reject(error)
    //     }
    // },
    // createOrder: async (createOrderRequest) => {
    //     try {
    //         const response = await AxiosInstance()
    //             .post(`/carts`, createOrderRequest)

    //         if (response.status == true) {
    //             return response.product
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return Promise.reject(error)
    //     }
    // }, 



}

export default BookAPIHelper