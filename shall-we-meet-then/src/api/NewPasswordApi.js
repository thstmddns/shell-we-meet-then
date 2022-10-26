import api from './api'

export const newPasswordApi = async(dataInfo) => {
    return await api.put('/members/password',dataInfo)
}