import baseAxios from "axios"; 
import axios, { AxiosRequestConfig } from "axios";


const api = baseAxios.create({
    baseURL: "https://server.shallwemeetthen.com",
}); 


api.interceptors.request.use((config)=> {

    config.headers = {
        'Authorization': `${sessionStorage.getItem("accessToken")}`
    }
    return config; 
});

export default api;


// import baseAxios from "axios"; 
// import axios, { AxiosRequestConfig } from "axios";


// const api = baseAxios.create({
//     baseURL: "http://k7d105.p.ssafy.io",
// }); 


// api.interceptors.request.use((config)=> {

//     config.headers = {
//         'Authorization': `Bearer ${sessionStorage.getItem(
//                  "accessToken",
//             )}`
//     }
//     return config; 
// });

// export default api;
