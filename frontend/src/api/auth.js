import client from "./client";

const createUser = async (userInfo) => {
    try {
        const {data} = await client.post('/user/create', userInfo)
        return data
    } catch(error) {
        const {response} = error
        if (response?.data) return response.data

        return {error: error.message || error}
    }
}

const verifyUserEmail = async (userInfo) => {
    try {
        const {data} = await client.post('/user/verify-email', userInfo)
        return data
    } catch(error) {
        const {response} = error

        if (response?.data) return response.data
        return {error: error.message || error}
    }
}

const signinUser = async (userInfo) => {
    try {
        const {data} = await client.post('/user/sign-in', userInfo)
        return data
    } catch(error) {
        const {response} = error

        if (response?.data) return response.data
        return {error: error.message || error}
    }
}

const getIsAuth = async (token) => {
    try {
        const {data} = await client.get('/user/is-auth', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
        return data
    } catch(error) {
        const {response} = error

        if (response?.data) return response.data
        return {error: error.message || error}
    }
}

const forgetPassword = async (email) => {
    try {
        const {data} = await client.post('/user/forget-password', {email})
        return data
    } catch(error) {
        const {response} = error

        if (response?.data) return response.data
        return {error: error.message || error}
    }
}

export {createUser, verifyUserEmail, signinUser, getIsAuth, forgetPassword}