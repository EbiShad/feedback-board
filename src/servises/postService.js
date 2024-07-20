import http from "./httpServises";



export async function createPost(data) {
    return http.post("/api/feedback",data).then(res => res.data)
}