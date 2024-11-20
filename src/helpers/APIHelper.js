import AxiosInstance from "./AxiosInstance";

const APIHelper = {
    register: async (registerRequest) => {
        try {
            const { email, name, password } = registerRequest
            const body = {
                email: email,
                name: name,
                password: password,

            }

            const response = await AxiosInstance().post('user/register', body)
            // .post('register.php', body)

            console.log(response)
            return response
            // if (response.status == true) {
            //     return true;
            // }

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

            const response = await AxiosInstance().post('user/login', body)
            // .post('login.php', body)

            // console.log(response)
            // return response
            if (response.status == true) {
                return response.userDetail
            }

        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    },

    getCategories: async () => {
        try {
            const response = await AxiosInstance()
                .get('category/list')

            if (response.status == true) {
                return response.categories
            }

        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
        return []
    },

    getProductByCategory: async (categoryId) => {
        try {
            const response = await AxiosInstance()
                .get(`product/list/category/${categoryId}`)

            if (response.status == true) {
                return response.products
            }

        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
        return []
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

export default APIHelper