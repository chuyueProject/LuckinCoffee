import axios from "../utils/axios"
class Goods {
    // 获取商品列表
    list(page = 1, pageSize = 3) {
        let url = '/luckin/admin/goods/getInfoByPage'
        // console.log('api',page,pageSize)
        return axios.get(url, { params: { page, pageSize } })
    }
    // 删除商品
    del(_id) {
        console.log(_id)
        let url = '/luckin/admin/goods/del'
        return axios.delete(url, { data: { _id } })
    }
    // 添加商品
    add(payload) {
        let url = '/luckin/admin/goods/add'
        return axios.post(url, payload)
    }
    // 修改商品
    update(payload) {
        let url = '/luckin/admin/goods/update'
        return axios.put(url, payload)

    }

    // 修改商品putaway
    putaway(_id, putaway) {
        let url = '/luckin/admin/goods/putaway'
        return axios.put(url, { _id, putaway })

    }

    // 查找商品
    findOne(_id) {
        let url = '/luckin/admin/goods/getInfoById'
        return axios.get(url, { params: { _id } })

    }

    // 获取商品分类列表
    kindlist() {
        let url = '/luckin/admin/Kind/allkind'
        return axios.get(url)
    }

}

export default new Goods();