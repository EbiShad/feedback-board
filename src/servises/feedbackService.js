import http from "./httpServises";



export async function createPostFn(data) {
    return http.post("/api/feedback",data).then(res => res.data)
}

export async function getFeedbackFn() {
    return http.get("/api/feedback").then(res => res.data)
}

export async function editFeedbackFn(data) {
    return http.put("/api/feedback",data).then(res => res.data)
}

