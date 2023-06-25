import client from "./client";

const createUser = async (userInfo) => {
    try {
        const {data} = await client.post('/user/signup', userInfo)
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

export {createUser, verifyUserEmail}