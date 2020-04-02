import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import Style from './index.module.less'
import goodsApi from '../../../api/goods'
import uploadApi from '../../../api/upload'


class GoodsUpdate extends Component {
    state = {

        "Chinesename": "卡布奇诺瑞纳冰",
        "Englishname": "Cappuccino Exfreezo",
        "price": "15.4",
        "oldprice": "28",
        "desc": "好喝",
        "temp": 0,
        "cream": 0,
        "picture": "暂无",
        "putaway":"0",
        "kind": "",
        'types': []

    }

    upload = async () => {
        let file = this.refs.img.files[0]
        if (!file) { return message.error('请先选择一张图片') }
        let { size, type } = file;
        let types = ['jpg', 'jpeg', 'gif', 'png']
        if (size > 1000000) { return message.warning('图片超过1M') }
        if (types.indexOf(type.split('/')[1]) === -1) { return message.warning('只允许jpg,jpeg,gif,png四种格式') }
        let formdata = new FormData()
        formdata.append('upload', file)
        // console.log('formdata',formdata.get('upload'))
        let { err, msg, path } = await uploadApi.img(formdata)
        if (err) { return message.error(msg) }
        this.setState({ picture: path })
    }

    update = async () => {
        // let {id}=this.props.match.params;

        if (!this.state.picture) { return message.info('请先上传图片') }
        // console.log(id)

        let result = await goodsApi.update(this.state)
        console.log(result)
        let { err, msg } = result
        if (err === 0) {
            message.success(msg)
            this.props.history.replace('/admin/goods')
        } else {
            return message.err(msg)
        }
    }

    async componentDidMount() {
        // console.log(this)
        let { id } = this.props.match.params;
        let result = await goodsApi.findOne(id)
        let { err, msg, list } = result
        // delete list[0]['_id']
        delete list[0]['__v']



        // console.log(list[0])
        if (err === 0) {

            this.setState({ ...list[0] })

        } else {
            return message.err(msg)
        }

        let { data } = await goodsApi.kindlist()
        this.setState({ types: data, kind: data[0].name })
    }


    render() {
        let { Chinesename, Englishname, price, oldprice, desc, picture, kind, types ,putaway} = this.state
        return (
            <div className={Style.box}>
                <Card title='商品修改' className={Style.card}>
                    中文：<input type='txt' value={Chinesename} onChange={(e) => {
                        this.setState({ Chinesename: e.target.value })
                    }} /><br />
                    英文：<input type='txt' value={Englishname} onChange={(e) => {
                        this.setState({ Englishname: e.target.value })
                    }} /><br />
                    价格：<input type='number' value={price} onChange={(e) => {
                        this.setState({ price: e.target.value })
                    }} /><br />
                    原价：<input type='number' value={oldprice} onChange={(e) => {
                        this.setState({ oldprice: e.target.value })
                    }} /><br />
                    描述：<input type='txt' value={desc} onChange={(e) => {
                        this.setState({ desc: e.target.value })
                    }} /><br />

                    状态：<select value={putaway} onChange={(e) => {
                        this.setState({ putaway: Number(e.target.value) })
                    }}>
                        <option value={-1}>下架</option>
                        <option value={0}>未上架</option>
                        <option value={1}>上架</option>
                    </select><br/>


                    {/* 温度：<select value={temp} onChange={(e) => {
                        this.setState({ temp: Number(e.target.value) })
                    }}>
                        <option value={0}>冰</option>
                        <option value={1}>热</option>
                    </select><br />
                    奶油：<select value={cream} onChange={(e) => {
                        this.setState({ cream: Number(e.target.value) })
                    }}>
                        <option value={0}>默认奶油</option>
                        <option value={1}>无奶油</option>
                    </select><br /> */}

                    类别：<select value={kind} onChange={(e) => {

                        // console.log(e.target.value)
                        // console.log('e.target.value',e.target.value)
                        this.setState({ kind: e.target.value })
                    }}>
                        {types.map((item, index) => {
                            //   console.log('kind',kind)
                            return (<option value={item.name} key={item._id}>{item.name}</option>)
                        })}
                    </select><br />

                    图片：<input type='file' ref='img' /> <button onClick={this.upload}>上传图片</button>
                    <img alt='' width='120' height='80' src={'http://39.107.254.157:3000' + picture  } /> <br />

                    <Button onClick={this.update} type='primary'>修改</Button>
                </Card>
            </div>
        );
    }
}

export default GoodsUpdate;
