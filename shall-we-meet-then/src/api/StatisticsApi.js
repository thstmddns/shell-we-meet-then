import api from './api'

// 특정 멤버 글 갯수 조회
const getArticleCountApi = async(groupMemberSeq) => {
    return await api.get(`/boards/group-members/${groupMemberSeq}/count`)
}
// 그룹 내 총 게시글 갯수 조회
const getTotalArticleCountApi = async(groupSeq) => {
  return await api.get(`/groups/${groupSeq}/count`)
}
// 마지막 게시글 작성자 조회
const getLastAuthorApi = async(groupSeq) => {
  return await api.get(`/groups/${groupSeq}/last-author`)
}
// 가장 많이 작성한 멤버 조회
const getMostWrittenMemberApi = async(groupSeq) => {
  return await api.get(`/groups/${groupSeq}/most-written-member `)
}
// 가장 길게 작성한 멤버 조회
const getLongestWrittenMemberApi = async(groupSeq) => {
  return await api.get(`/groups/${groupSeq}/longest-written-member`)
}
// 문제를 가장 많이 맞춘 멤버 조회
const getQuizKingApi = async(groupSeq) => {
  return await api.get(`/groups/${groupSeq}/quiz-king`)
}

export {
  getArticleCountApi,
  getTotalArticleCountApi,
  getLastAuthorApi,
  getMostWrittenMemberApi,
  getLongestWrittenMemberApi,
  getQuizKingApi
}