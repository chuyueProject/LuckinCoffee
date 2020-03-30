import React,{Component} from 'react'
import {Card,message} from 'antd'
import kindApi from '../../../api/kinds'
class GoodsUpdata extends Component{
    state={
        name:"",
    }
    componentDidMount(){
    let _id=this.props.match.params.id
  
    kindApi.kindOneData(_id)
    .then((data)=>{
        let {name}=data.data.list[0]
        this.setState({name})
    })
    }
    //商品修改
    submit=()=>{
       let {name}=this.state
       let _id=this.props.match.params.id
       console.log(_id)
     kindApi.kindUpdata(_id,name)
      .then((data)=>{
        let {err,msg} =data.data
       
        if(err){return message.error(msg)}
      })
      this.props.history.replace('/admin/goodskind')
    }

    render(){
        let {name}=this.state
        return(
            <div >
                <Card title='商品添加'>
                    名称:<input type='text' value={name} onChange={
                        (e)=>{this.setState({name:e.target.value})}
                    }/><br/> 
                   <button onClick={()=>{
                       this.submit()
                   }}>修改</button>
                </Card>
            </div>
        )
    }
}

export default GoodsUpdata