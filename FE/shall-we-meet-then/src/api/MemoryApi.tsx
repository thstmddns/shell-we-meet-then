import api from './api'

// 글 리스트 조회
export const getArticlesApi = async(groupSeq: number) => {
    return await api.get(`/boards`, { params: groupSeq})
}
// 글 상세 조회
export const getArticleApi = async(boardSeq: number) => {
    return await api.get(`/boards/${boardSeq}`)
}

// 로그인 멤버 글 갯수 조회
export const getArticleCount = async(groupSeq: number) => {
    return await api.get(`/boards/count`, { params : groupSeq })
}

// 전체 맴버 글 갯수 조회
export const getTotalArticleCount = async(groupSeq:number) => {
    return await api.get(`/groups/${groupSeq}/count`)
}


// 동영상 원본 파일 조회
export const getVideoApi = async(boardSeq: number) => {
    return await api.get(`/boards/${boardSeq}/video-download`)
}
// 썸네일 사진 원본 파일 조회
export const getThumbnailApi = async(boardSeq: number) => {
    return await api.get(`/boards/${boardSeq}/image-download`)
}
// 사진 원본 파일 조회  
export const getImageApi = async(boardImageSeq: number) => {
    return await api.get(`/board-image/${boardImageSeq}/file-download`)
}

// 그룹 상세 조회
export const getGroupDetailsApi = async(groupSeq:number) => {
    return await api.get(`/groups/${groupSeq}`)
}
// 그룹 맴버 리스트 조회
export const getGroupMembersApi = async(groupSeq: number) => {
    return await api.get(`/group-members`, { params : groupSeq })
}
// 그룹 내 내 정보 조회
export const getMyInfoApi = async(groupSeq:number) => {
    return await api.get(`/group-members/my-info`, { params : groupSeq })
}

// 로그인한 유저의 날짜별 글 갯수 조회
export const getTotalUserArticleCountApi = async(info:any) => {
    return await api.get(`/boards/count-per-day`, { params : info })
}
// 멤버별 글 갯수 조회
export const getGroupArticleCountApi = async(info:any) => {
    return await api.get(`/boards/member-total-count`, { params : info })
}
