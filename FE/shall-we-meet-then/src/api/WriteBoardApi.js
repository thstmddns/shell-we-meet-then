import api from './api'

// Write
export const writeMemoryApi = async(formData) => {
    return await api.post('/boards', formData, {
        header: {
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
