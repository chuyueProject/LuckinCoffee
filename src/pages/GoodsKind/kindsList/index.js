import React, { Component } from 'react';
import { Table, Popconfirm, Button, message, Card, Spin } from 'antd';
import kindsApi from '../../../api/kinds'
import Style from './index.module.less'
class GoodsKind extends Component {
  state = {
    spinning: false,
    list: [],
    columns: [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
        // width: 300,
      },
      {
        title: '食物分类',
        dataIndex: 'name',
        key: 'name',
        // width: 300,
      },
      {
        title: '操作',
        // key: 'action',
        // aligi: 'center',
        width: 120,
        render: (h) => {
          return (
            <div>
              <Popconfirm title='你确定要删除吗' onConfirm={() => {
                { this.delKinds(h._id) }
              }}>
                <Button type='danger' size='small' >删除</Button>
              </Popconfirm>
              <Popconfirm title='你确定要修改吗' onConfirm={() => {
                this.props.history.replace(`/admin/kindsupdata/${h._id}`)
              }}>
                <Button type='primary' size='small'>修改</Button>
              </Popconfirm>

            </div>
          )
        }
      }
    ]
  }
  componentDidMount() {
    this.refreshList()
  }
  delKinds = (_id) => {
    kindsApi.kindDel(_id)
      .then((data) => {
        console.log(data)
        let { err } = data
        if (err !== 0) { return false }
        this.refreshList()
      })
  }

  //刷新数据列表
  refreshList = () => {
    this.setState({ spinning: true })
    kindsApi.kindAll()
      .then((data) => {
        // console.log(data)
        let list = data.data
        this.setState({ list, spinning: false })
      })
  }
  render = () => {
    let { list, columns } = this.state
    return (
      <div className={Style.box}>
        <Card title='商品类别列表' className={Style.card}>
          <Button type='primary'  icon="plus" className={Style.addButtom} onClick={() => {
            this.props.history.push('/admin/kindsadd')
          }}>添加</Button>
          <Spin spinning={this.state.spinning}>
            <Table rowKey='_id' pagination={false} scroll={{ y: 300 }} dataSource={list} columns={columns} />
          </Spin>
        </Card>


      </div>
    )
  }
}

export default GoodsKind;