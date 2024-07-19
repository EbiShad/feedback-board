import http from "./httpServises";



export async function SignupFn(data) {
    return http.post("/api/auth/signup",data).then(res => res.data)
}