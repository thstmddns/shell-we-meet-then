import baseAxios from "axios"; 


const api = baseAxios.create({
    baseURL: "http://k7d105.p.ssafy.io:8080",
    // header: {
    //     Authorization: sessionStorage.getItem("accessToken"),
    // },
}); 

api.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem("accessToken");
    return config; 
});

export default api;
