import api from './api'

// 글 리스트 조회
const getArticlesApi = async(info) => {
    return await api.get(`/boards`, { params : info })
}
// 글 상세 조회
const getArticleApi = async(boardSeq) => {
    return await api.get(`/boards/${boardSeq}`)
}
// 로그인 멤버 글 갯수 조회
const getArticleCount = async(info) => {
    return await api.get(`/boards/count`, { params : info })
}
// 전체 맴버 글 갯수 조회
const getTotalArticleCount = async(groupSeq) => {
    return await api.get(`/groups/${groupSeq}/count`)
}
// 동영상 원본 파일 조회
const getVideoApi = async(boardSeq) => {
    return await api.get(`/boards/${boardSeq}/video-download`)
}
// 썸네일 사진 원본 파일 조회
const getThumbnailApi = async(boardSeq) => {
    return await api.get(`/boards/${boardSeq}/image-download`)
}
// 사진 원본 파일 조회
const getImageApi = async(boardImageSeq) => {
    return await api.get(`/board-image/${boardImageSeq}/file-download`)
}
// 그룹 상세 조회
const getGroupDetailsApi = async(groupSeq) => {
    return await api.get(`/groups/${groupSeq}`)
}
// 그룹 맴버 리스트 조회
const getGroupMembersApi = async(info) => {
    return await api.get(`/group-members`, { params : info })
}
// 그룹 내 내 정보 조회
const getMyInfoApi = async(info) => {
    return await api.get(`/group-members/my-info`, { params : info })
}




export {
    getArticlesApi,
    getArticleApi,
    getVideoApi,
    getThumbnailApi,
    getImageApi,
    getArticleCount,
    getTotalArticleCount,
    getGroupDetailsApi,
    getGroupMembersApi,
    getMyInfoApi,
  }