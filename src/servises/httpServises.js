import axios from "axios"


const app = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
    headers: { "Content-Type": "application/json" }
})

const http = {
    get:app.get,
    post:app.post,
    patch:app.patch,
    put:app.put,
    delete:app.delete,
}


export default http