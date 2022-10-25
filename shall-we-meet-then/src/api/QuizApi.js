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
const quizApi = async(quizInfo, groupSeq, success, fail) => {
    return await api.get(`/group-members/quiz/${groupSeq}`, quizInfo)
}
// 퀴즈 맞춘 갯수 조회
const quizScoreApi = async(quizInfo, groupSeq, success, fail) => {
  return await api.get(`/group-members/score`, quizInfo)
}
// 퀴즈 맞춘 갯수 저장
const quizCheckScoreApi = async(quizInfo, groupSeq, success, fail) => {
  return await api.put(`/group-members/check-nickname`, quizInfo)
}

export {
  quizApi,
  quizScoreApi,
  quizCheckScoreApi,
}