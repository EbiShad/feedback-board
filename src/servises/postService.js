import http from "./httpServises";



export async function createPostFn(data) {
    return http.post("/api/feedback",data).then(res => res.data)
}

