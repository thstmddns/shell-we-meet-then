import api from './api'

export const getGroupsApi = async() => {
    return await api.get('/groups')
}

export const openApi = async(info) => {
    return await api.post('/group-members/open',info)
}