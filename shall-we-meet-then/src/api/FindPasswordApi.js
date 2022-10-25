import api from './api'

export const findPasswordApi = async(email) => {
    return await api.get('/members/password',email)
}