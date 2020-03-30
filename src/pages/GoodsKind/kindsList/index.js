import React, { Component } from 'react';
import { Table, Divider, Tag, Popconfirm, Button, message, Card } from 'antd';
import kindsApi from '../../../api/kinds'
class GoodsKind extends Component {
  state = {  
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
               
              }}>
                <Button type='danger' size='small' onClick={()=>{
                  
                  this.props.history.replace(`/admin/goodskind`)
                }}>删除</Button>
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
    this.kindsList()
}

  kindsList=()=>{
    kindsApi.kindAll()
    .then((data)=>{
     
      let list=data.data.data
      this.setState({list})
    })
  }


  delKinds=(_id)=>{
    kindsApi.kindDel(_id)
    .then((data)=>{
      console.log(data)
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
       <Table  rowKey='_id' pagination={false} scroll={{y:300}} dataSource={list} columns={columns} />
      </div>
     )
  }
}
 
export default GoodsKind;