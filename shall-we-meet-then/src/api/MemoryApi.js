import api from './api'

// 글 리스트 조회
const getArticlesApi = async() => {
    return await api.get(`/boards`)
}
// 글 상세 조회
const getArticleApi = async(boardSeq) => {
    return await api.get(`/boards/${boardSeq}`)
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

export {
    getArticlesApi,
    getArticleApi,
    getVideoApi,
    getThumbnailApi,
    getImageApi
  }