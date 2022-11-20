import api from './api'

// 특정 멤버 글 갯수 조회
export const getArticleCountApi = async(groupMemberSeq:number) => {
    return await api.get(`/boards/group-members/${groupMemberSeq}/count`)
}
// 그룹 내 총 게시글 갯수 조회
export const getTotalArticleCountApi = async(groupSeq:number) => {
  return await api.get(`/groups/${groupSeq}/count`)
}
// 마지막 게시글 작성자 조회
export const getLastAuthorApi = async(groupSeq:number) => {
  return await api.get(`/groups/${groupSeq}/last-author`)
}
// 가장 많이 작성한 멤버 조회
export const getMostWrittenMemberApi = async(groupSeq:number) => {
  return await api.get(`/groups/${groupSeq}/most-written-member`)
}
// 가장 길게 작성한 멤버 조회
export const getLongestWrittenMemberApi = async(groupSeq:number) => {
  return await api.get(`/groups/${groupSeq}/longest-written-member`)
}
// 문제를 가장 많이 맞춘 멤버 조회
export const getQuizKingApi = async(groupSeq:number) => {
  return await api.get(`/groups/${groupSeq}/quiz-king`)
}

