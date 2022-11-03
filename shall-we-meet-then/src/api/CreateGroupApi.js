import api from './api'

export const  addGroup = async(info) => {
    return await api.post('/groups', info)
}

export const addGroupMember = async(info) => {
    return await api.post('/group-members', info)
}



