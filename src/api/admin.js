import axios from '../utils/axios'
class Admin {
    login(payload){
      let url = '/luckin/admin/user/login'
      return axios.post(url,payload)
    }
    reg(payload){
        let url = '/luckin/admin/user/reg'
        return axios.post(url,payload)
    }
    code(payload){
      let url = '/luckin/admin/user/getCode'
      return axios.post(url,payload)
    }
    getUserList(payload){
      let url = '/luckin/admin/user/getUserList'
      console.log(payload)
      return axios.post(url,payload)
    }
    add({mail,pass}){
      let url = '/luckin/admin/user/add'
      return axios.post(url,{mail,pass})
    }
    del(payload){
      let url ='/luckin/admin/user/del'
      return axios.delete(url,payload)
    }
  }
  
  export default new Admin()