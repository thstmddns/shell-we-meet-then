import api from './api'


// api 코드 예시
export const writeMemoryApi = async(memoryInfo, groupSeq, success, fail) => {
    return await api.post(`/group/tree/${groupSeq}`, memoryInfo)
}


// 남은 열람날짜 조회 api : D-Day별로 UI가 변경 /  


// 글쓰기 api : content, image, video


// Group 정보 조회 api : 그룹이름 가져오기 