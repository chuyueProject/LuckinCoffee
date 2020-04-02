import axios from "../utils/axios"
class Discount {
    // 获取列表
    list(page = 1, pageSize = 3) {
        let url = '/luckin/admin/discount/getInfoByPage'
        // console.log('api',page,pageSize)
        return axios.get(url, { params: { page, pageSize } })
    }
    // 删除
    del(_id) {
        console.log(_id)
        let url = '/luckin/admin/discount/del'
        return axios.delete(url, { data: { _id } })
    }
    // 添加
    add(payload) {
        let url = '/luckin/admin/discount/add'
        return axios.post(url, payload)
    }
}

export default new Discount();