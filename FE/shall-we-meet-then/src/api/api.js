import baseAxios from "axios"; 


const api = baseAxios.create({
    baseURL: "https://server.shallwemeetthen.com",
    // header: {
    //     Authorization: sessionStorage.getItem("accessToken"),
    // },
}); 

api.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem("accessToken");
    return config; 
});

export default api;
