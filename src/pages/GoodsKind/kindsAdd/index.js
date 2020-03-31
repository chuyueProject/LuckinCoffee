import React,{Component} from 'react'
import {Card,message} from 'antd'

import kindsApi from '../../../api/kinds'
class kindsAdd extends Component{
    state={
        "name":"",

    }
    //商品添加
    submit=()=>{
       kindsApi.kindAdd(this.state)
       .then((data)=>{
           console.log(data)
           //let {code,msg}=data.data
           //if(code){return message.error(msg)}
         // console.log(data)
           this.props.history.replace('/admin/goodskind')
       })
    }
    render(){
        let {name}=this.state
        return(
            <div >
                <Card title='分类添加'>
                    名称:<input type='text' value={name} onChange={
                        (e)=>{this.setState({name:e.target.value})}
                    }/><br/> 
                   <button onClick={()=>{
                       this.submit()
                   }}>添加</button>
                </Card>
            </div>
        )
    }
}

export default kindsAdd