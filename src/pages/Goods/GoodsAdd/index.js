import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import Style from './index.module.less'
import goodsApi from '../../../api/goods'


class GoodsAdd extends Component {
    state = {

        "Chinesename": "卡布奇诺瑞纳冰",
        "Englishname": "Cappuccino Exfreezo",
        "price": "15.4",
        "desc": "好喝",
        "temp": 0,
        "cream": 0,
        "picture": "暂无",

    }

    submit = async () => {
        let { err, msg } = await goodsApi.add(this.state)
        if (err === 0) {
            message.success(msg)
            this.props.history.replace('/admin/goods')
        } else {
            return message.err(msg)
        }


    }


    render() {
        let { Chinesename, Englishname, price, desc, temp, cream, picture } = this.state
        return (
            <div className={Style.box}>
                <Card title='商品添加' className={Style.card}>
                    中文：<input type='txt' value={Chinesename} onChange={(e) => {
                        this.setState({ Chinesename: e.target.value })
                    }} /><br />
                    英文：<input type='txt' value={Englishname} onChange={(e) => {
                        this.setState({ Englishname: e.target.value })
                    }} /><br />
                    价格：<input type='number' value={price} onChange={(e) => {
                        this.setState({ price: e.target.value })
                    }} /><br />
                    描述：<input type='txt' value={desc} onChange={(e) => {
                        this.setState({ desc: e.target.value })
                    }} /><br />
                    温度：<select value={temp} onChange={(e) => {
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
                    </select><br />
                    图片：<input type='txt' value={picture} onChange={(e) => {
                        this.setState({ picture: e.target.value })
                    }} /><br />

                    <Button onClick={this.submit} type='primary'>添加</Button>
                </Card>
            </div>
        );
    }
}

export default GoodsAdd;
