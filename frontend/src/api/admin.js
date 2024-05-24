import { catchError, getToken } from "../utils/helper"
import client from "./client"

export const getAppInfo = async () => {
    try {
        const token = getToken()
        const {data} = await client("/admin/app-info", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch(err) {
        return catchError(err)
    }
}

export const getMostRatedMovies = async () => {
    try {
        const token = getToken()
        const {data} = await client("/admin/most-rated", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch(err) {
        return catchError(err)
    }
}