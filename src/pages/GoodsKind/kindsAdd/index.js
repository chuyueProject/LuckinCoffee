import React,{Component} from 'react'
import {Card,Button} from 'antd'
import Style from './index.module.less'

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
                <Card title='分类添加' className={Style.Card}>
                    名称:<input type='text' value={name} onChange={
                        (e)=>{this.setState({name:e.target.value})}
                    }/><br/> 
                   <Button onClick={()=>{
                       this.submit()
                   }}>添加</Button>
                </Card>
            </div>
        )
    }
}

export default kindsAdd