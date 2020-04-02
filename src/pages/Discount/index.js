import React, { Component } from 'react';
import { Card, Table, Button, Modal, notification, Spin, Popconfirm, message, Pagination } from 'antd'
import style from './index.module.less'
import discountApi from '../../api/discount'
console.log()
class Discount extends Component {
  state = {
    page: 1,
    pageSize: 3,
    allCount: 0,
    dataSource: [],
    visible: false,
    spinning: false,
    columns: [

      {
        title: '优惠活动',
        dataIndex: 'discountName',
        key: 'discountName',
        width: 200
      },
      {
        title: '有效时间',
        dataIndex: 'indate',
        key: 'indate',
        width: 200

      },
      {
        title: '折扣力度',
        dataIndex: 'discount',
        key: 'discount',
        width: 120,


      },
      {
        title: '使用规则',
        dataIndex: 'rule',
        key: 'rule',
        width: 500

      },
      {
        title: '操作',
        key: 'action',
        // 定义渲染的列
        // 参数如果没写dataIndex 整条数据  写了dataIndex 那就是关联数据
        render: (record) => {
          return (
            <div>
              <Popconfirm
                title="你确定要删除这个用户吗?"
                onConfirm={() => {
                  this.del(record._id)
                  this.refreshList()
                }}
                onCancel={() => {
                  message.error('取消删除');
                }}
              >
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
            </div>
          )
        },
      }
    ]
  }
  del = async (_id) => {
    // 获取id 掉接口 刷新界面
    //  console.log('删除',_id)
    let result = await discountApi.del(_id)
    // 根据结果进行
    if (result.err === -1) { return false }
    this.refreshList()
  }
  handleOk = async () => {
    // 先获取输入内
    // 做添加接口
    // 关闭模态框
    // 刷新界面
    let discountName = this.refs.discountName.value
    let indate = this.refs.indate.value
    let discount = this.refs.discount.value
    let rule = this.refs.rule.value
    let result = await discountApi.add({ discountName, indate, discount, rule })

    if (result.err !== 0) { return notification.error({ description: '管理员添加失败，请详细检查传输', message: '错误', duration: 1.5 }) }
    notification.success({ description: '管理员添ok，模态框即将关闭', message: '成功', duration: 1.5 })
    this.setState({ visible: false })
    this.refreshList()
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  //刷新列表数据
  refreshList = async () => {
    let { page, pageSize } = this.state
    this.setState({ spinning: true })
    let result = await discountApi.list(page, pageSize)
    // console.log(result)

    this.setState({ dataSource: result.list, allCount: result.allCount, spinning: false })
  }
  componentDidMount() {
    // 请求数据渲染界面
    this.refreshList()

  }


  render() {
    let { dataSource, visible, spinning, columns, page, pageSize, allCount } = this.state
    return (
      <div className={style.box}>
        <Card title='优惠券列表' className={style.card}>
          {/* dataSource 表格内容数据
                columns    表头数据
                rowKey     设置为唯一索引字段
            */}
          <Button type="primary" icon="plus" className={style.addButtom} onClick={() => {
            this.setState({ visible: true })
          }}>添加</Button>
          <Spin spinning={spinning}>
            <Table dataSource={dataSource} columns={columns} rowKey='_id' pagination={false}></Table>
            <Pagination className={style.page} current={page} total={allCount} showQuickJumper pageSize={pageSize}
              onChange={(page, pageSize) => {
                // console.log(page)
                this.setState({ page }, () => {
                  this.refreshList()
                })
              }}

            ></Pagination>
          </Spin>
        </Card>
        {/* 添加的模态框 */}
        <Modal className={style.modal}
          title="管理员添加"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          优惠活动:<input className={style.inputbox} type="text" ref='discountName' /><br />
          有效时间:<input className={style.inputbox} type="date" ref='indate' /><br />
          折扣力度:<input className={style.inputbox} type="text" ref='discount' /><br />
          使用规则:<input className={style.inputbox} type="text" ref='rule' /><br />
        </Modal>
      </div>
    );
  }
}

export default Discount;
