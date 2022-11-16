import api from './api'

export const getGroupsApi = async() => {
    return await api.get('/groups')
}

export const openApi = async(groupSeq) => {
    return await api.post('/group-members/open', { groupSeq })
}

// // 로그인 멤버 글 갯수 조회
// const getArticleCount = async(info) => {
//     return await api.get(`/boards/count`, { params : info })
// }