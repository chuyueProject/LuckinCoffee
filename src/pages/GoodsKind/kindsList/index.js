import React, { Component } from 'react';
import { Table, Tag, Popconfirm, Button, message, Card ,Spin} from 'antd';
import kindsApi from '../../../api/kinds'
class GoodsKind extends Component {
  state = {  
    spinning: false,
    list :[],
    columns:[
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '食物分类',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title:'操作',
        key:'action',
        aligi:'center',
        render:(h)=>{
          return(
            <span>
              <Popconfirm title='你确定要删除吗' onConfirm={()=>{
                {this.delKinds(h._id)}
               
              }}
              onCancel={()=>{
                message.error('取消删除')
              }}
              >
                <Button type='danger'  size='small' >删除</Button>
              </Popconfirm>
              <Button type='primary' size='small' onClick={()=>{
                this.props.history.replace(`/admin/kindsupdata/${h._id}`)
              }}>
                修改
              </Button>
            </span>
          )
        }
      }
    ]
  }
  componentDidMount(){
    this.refreshList()
}
  delKinds=(_id)=>{
    kindsApi.kindDel(_id)
    .then((data)=>{
      console.log(data)
      let {err,msg}=data
      if(err!== 0){return false}
      this.refreshList()
    })
  }

  //刷新数据列表
  refreshList=()=>{
    this.setState({spinning:true})
    kindsApi.kindAll()
    .then((data)=>{
      console.log(data)
      let list=data.data
      this.setState({list,spinning:false})
    })
  }
  render=()=> { 
    let {list,columns}=this.state
    return ( 
      <div>
        <Card title='商品列表' >
          <Button  type='primary' onClick={()=>{
            this.props.history.push('/admin/kindsadd')
          }}>添加商品列表</Button>
        </Card>
        <Spin spinning={this.state.spinning}>
            <Table  rowKey='_id' pagination={false} scroll={{y:300}} dataSource={list} columns={columns} />
        </Spin>
     
      </div>
     )
  }
}
 
export default GoodsKind;