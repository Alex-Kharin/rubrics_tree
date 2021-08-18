import axios from "axios"


const instance = axios.create({
    baseURL: 'https://www.klerk.ru/yindex.php/v3/event/rubrics',
    headers: {
        "Content-Type": "application/json"
    }
})

const jsonServer = axios.create({
    baseURL: ' https://my-json-server.typicode.com/Alex-Kharin/rubrics-tree-db',
    headers: {
        "Content-Type": "application/json"
    }
})

export const klerkApi = {
    getRubrics(allowEmpty = 0) {
        return instance.get(undefined, {
            params: {
                allowEmpty
            }
        }).then(response => response.data)
    },
    
    
}

export const jsonServerApi = {
    getData(data) {
        return jsonServer.get(`/${data}`).then(response => response.data)
    }
}