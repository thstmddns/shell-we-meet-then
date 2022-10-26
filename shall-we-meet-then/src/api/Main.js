import api from './api'

export const getGroupsApi = async() => {
    return await api.get('/groups')
}