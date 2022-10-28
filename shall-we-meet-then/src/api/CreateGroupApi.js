import api from './api'

export const  addGroup = async(info) => {
    return await api.post('/groups', info)
}