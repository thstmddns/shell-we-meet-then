import api from './api'

// import interface
import { GroupInfo } from '../pages/CreateGroup/CreateGroup'
import { JoinInfo } from '../pages/CreateGroup/CreateGroup'

export const  addGroup = async(info: GroupInfo) => {
    return await api.post('/groups', info)
}

export const addGroupMember = async(info : JoinInfo) => {
    return await api.post('/group-members', info)
}