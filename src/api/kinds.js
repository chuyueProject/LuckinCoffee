import axios from 'axios'
class kinds{
    kindAll(){
    let url='/luckin/admin/kind/allkind'
    return axios.get(url)
    }
    kindDel(_id){
        console.log(_id)
        let url='/luckin/admin/kind/removekind'
        return axios.delete(url,{data:{_id}})
    }
    kindUpdata(_id,playload){
        console.log(_id,playload)
        let url='/luckin/admin/kind/updatakind'
        return axios.put(url,{_id:_id,name:playload})
    }
    kindAdd(playload){
        console.log(playload)
        let url='/luckin/admin/kind/inserkind'
        return axios.post(url,playload)
    }
    kindOneData(_id){
        
        let url='/luckin/admin/kind/getInfoById'
        return axios.post(url,{_id})
    }
}

export default new kinds()