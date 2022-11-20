import api from './api'

// Write
export const writeMemoryApi = async(formData: FormData) => {
    return await api.post('/boards', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

// axios
// .post("/boards", formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// })
// .then((res)=> {
//   navigate("/main") 
// });
// };
