import axios from '../pages/utils/axios'
class Upload {
    img(payload){
        let url ='/luckin/admin/upload/img'
        return axios.post(url,payload)
    }
}

export default new Upload()