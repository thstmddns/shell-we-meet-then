import api from './api'

// Write
export const writeMemoryApi = async(formData, success, fail) => {
    return await api.post('/boards', formData, {
        header: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then(success)
    .catch(fail)
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
