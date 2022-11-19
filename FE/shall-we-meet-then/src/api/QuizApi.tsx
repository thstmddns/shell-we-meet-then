import api from './api'


// api 코드 예시
// export const writeMemoryApi = async(memoryInfo, groupSeq, success, fail) => {
//     return await api.post(`/group/tree/${groupSeq}`, memoryInfo)
// }
// 사용 예시
// import quizApi from '../api/QuizApi.js'
// quizApi(memoryInfo, groupSeq)
// .then((res)=>{
//   console.log(res.data)
// })
// .catch((err)=>{
//   console.error(err.data);
// })

// 퀴즈 불러오기
export const quizApi = async(groupSeq:number) => {
  return await api.get(`/quiz`, { params: groupSeq})
}
// 퀴즈 맞춘 갯수 조회
export const quizGetScoreApi = async(groupSeq:number) => {
  return await api.get(`/group-members/score`, { params: groupSeq})
}
// 퀴즈 맞춘 갯수 저장
export const quizAddScoreApi = async(groupSeq: number, score:number) => {
  return await api.put(`/group-members/score`, {groupSeq, score})
}
