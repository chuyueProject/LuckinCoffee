import React, { Component } from 'react';
import { Card, Table, Button, Pagination, message, Tag, Popconfirm } from 'antd'
import Style from './index.module.less'
import goodsApi from '../../../api/goods'
class Goods extends Component {
  state = {
    page: 1,
    pageSize: 3,
    list: [],
    allCount: 0,
    columns: [
      { title: '_id', dataIndex: '_id', key: '_id', width: 120 },
      { title: '中文名称', dataIndex: 'Chinesename', key: 'Chinesename', width: 120 },
      { title: '英文名称', dataIndex: 'Englishname', key: 'Englishname', width: 120 },
      { title: '价格', dataIndex: 'price', key: 'price', width: 80 },
      { title: '原价', dataIndex: 'oldprice', key: 'oldprice', width: 80 },
      { title: '描述', dataIndex: 'desc', key: 'desc', width: 120 },
      {
        title: '状态', dataIndex: 'putaway', key: 'putaway', render(putaway) {
          // console.log(putaway)
          if (!putaway) { putaway = 0 }
          let obj = { '-1': { color: 'red', msg: '已下架' }, '0': { color: 'yellow', msg: '未上架' }, '1': { color: 'green', msg: '已上架' } }
          return (<Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>)
        }, width: 80
      },
      // {title:'温度',dataIndex:'temp',key:'temp',width:80,render(temp){
      //   // console.log(temp)
      //   let obj={'0':{color:'red',msg:'热'},'1':{color:'blue',msg:'冰'}}
      // return(<Tag color={obj[temp].color}>{obj[temp].msg}</Tag>)
      // }},
      // {title:'奶油',dataIndex:'cream',key:'cream',width:80,render(cream){

      //   let obj={'0':{color:'green',msg:'默认奶油'},'1':{color:'orange',msg:'无奶油'}}
      // return(<Tag color={obj[cream].color}>{obj[cream].msg}</Tag>)
      // }},
      {
        title: '类别', dataIndex: 'kind', key: 'kind', width: 120, render(kind) {
          // console.log( 'kindddd',kind)
          return (<span>{kind ? kind : '暂无类别'}</span>)
        }
      },
      {
        title: '图片', dataIndex: 'picture', key: 'picture', width: 120, render(picture) {
          let url = 'http://localhost:3000' + picture
          return (<img width='150' height='80' src={url} />)
        }
      },
      {
        title: '操作', width: 120, fixed: 'right', render: (recode) => {
          // console.log(recode)
          return (
            <div>
              {/* 删除 */}
              <Popconfirm title='你确定要删除该商品吗?'
                onConfirm={() => { this.delGoods(recode._id) }}>
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
              {/* 上架 */}
              <Popconfirm title='你确定要修改该商品的状态嘛?'
                onConfirm={() => { this.putAwayGodds(recode._id, recode.putaway) }}
              >
                <Button type='warn' size='small'>上架</Button>
              </Popconfirm>
              {/* 修改 */}
              <Popconfirm title='你确定要更新该商品吗?'
                onConfirm={() => { this.props.history.replace('/admin/goodsupdate/' + recode._id) }}>
                <Button type='primary' size='small'>修改</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }
  //修改putaway 
  putAwayGodds = async (_id,putaway)=>{
    if(putaway ===0||putaway === -1){
      putaway = 1
    }else{
      putaway = -1
    }
    let {err,msg} = await goodsApi.putaway(_id,putaway)
    if(err){ return message.error(msg)}
    this.getListData()
  }
  // 删除商品
  delGoods = async (_id) => {

    let { err, msg } = await goodsApi.del(_id)
    if (err === -1) { return message.err(msg) }
    message.success(msg)
    this.getListData()
  }
  // 获取商品列表（分页）
  getListData = async () => {
    let { page, pageSize } = this.state
    console.log(page,pageSize)
    let result =await goodsApi.list(page, pageSize)
    console.log(result)
    let { err, msg, list, allCount } =result
    // let { err, msg, list, allCount } = await goodsApi.list(page, pageSize)
    if (err !== 0) { return message.error(msg) }
    // console.log(list)
    this.setState({ list, allCount })
  }
  componentDidMount() {
    this.getListData()
  }
  render() {
    let { list, columns, allCount, page, pageSize } = this.state
    return (
      <div className={Style.box}>
        <Card title='商品列表' className={Style.card}>
          <Button type="primary" className={Style.addButtom}
            onClick={() => {
              // console.log('this',this)
              this.props.history.push('/admin/goodsadd')
            }}
          >添加商品</Button>

          <Table
            scroll={{ y: 300, x: 1100 }}
            columns={columns}
            dataSource={list}
            rowKey="_id"
            pagination={false}>
          </Table>
          <Pagination current={page} total={allCount} showQuickJumper pageSize={pageSize}
            onChange={(page, pageSize) => {
              // console.log(page)
              this.setState({ page }, () => {
                this.getListData()
              })
            }}

          ></Pagination>
        </Card>
      </div>
    );
  }
}

export default Goods;