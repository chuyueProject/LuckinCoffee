import axios from '../utils/axios'
class Admin {
    login(payload){
      let url = '/luckin/admin/user/login'
      return axios.post(url,payload)
    }
    code(payload){
      let url = '/luckin/admin/user/getCode'
      return axios.post(url,payload)
    }
    getUserList(){
      let url = '/luckin/admin/user/getUserList'
      return axios.post(url)
    }
    add({user,pass}){
      let url = '/luckin/admin/user/add'
      return axios.post(url,{user,pass})
    }
    del(_id){
      let url ='/luckin/admin/user/del'
      return axios.post(url,{_id})
    }
  }
  
  export default new Admin()