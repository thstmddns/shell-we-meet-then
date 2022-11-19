import api from './api'

export const getGroupsApi = async() => {
    return await api.get('/groups')
}

export const openApi = async(groupSeq: number) => {
    return await api.post('/group-members/open', { groupSeq }, {
        headers : {
            "Content-Type": "application/json",
        },      
    })
}