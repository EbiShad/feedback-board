
import http from "./httpServises";



export async function createVoteFn(data) {
    return http.post("/api/vote",data).then(res => res.data)
}

