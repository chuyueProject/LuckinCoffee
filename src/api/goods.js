import axios from '../pages/utils/axios'
class Goods {
    // 获取商品列表
    list(page = 1, pageSize = 3) {
        let url = '/luckin/admin/goods/getInfoByPage'
        return axios.post(url, { page, pageSize })
    }
    // 删除商品
    del(_id) {
        let url = '/luckin/admin/goods/del'
        return axios.post(url, { _id })
    }
    // 添加商品
    add(payload) {
        let url = '/luckin/admin/goods/add'
        return axios.post(url, payload)
    }
    // 修改商品
    update( payload) {
        let url = '/luckin/admin/goods/update'
        return axios.post(url,  payload )

    }
    // 查找商品
    findOne(_id) {
        let url = '/luckin/admin/goods/getInfoById'
        return axios.post(url, { _id })

    }

}

export default new Goods();