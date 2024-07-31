

import http from "./httpServises";



export async function createCommentFn(data) {
    return http.post("/api/comment",data).then(res => res.data)
}