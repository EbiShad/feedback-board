

import http from "./httpServises";



export async function createCommentFn(data) {
    return http.post("/api/comment",data).then(res => res.data)
}


export async function editCommentFn(data) {
    return http.put("/api/comment",data).then(res => res.data)
}