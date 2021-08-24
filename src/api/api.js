import axios from "axios"


const jsonServer = axios.create({
    baseURL: ' https://my-json-server.typicode.com/Alex-Kharin/rubrics-tree-db',
    headers: {
        "Content-Type": "application/json"
    }
})

export const jsonServerApi = {
    getData(data) {
        return jsonServer.get(`/${data}`).then(response => response.data)
    }
}