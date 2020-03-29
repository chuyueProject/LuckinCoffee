import React, { Component } from 'react';
import api from '../../api/admin.js'
import { Button,Input} from 'antd';
import style from './index.module.less'
class Code extends Component {
  constructor(){
    super()
    this.state={
      mail:'',
    }
  }
  Code=async()=>{
    let {mail} = this.state
    console.log(this.state)
    let result = await api.code({mail})
    console.log(result)
  }
      render(){
         let {mail} = this.state
        return (
        <div>
           获取验证码的邮箱输入处<Input type='text' value={mail}
           onChange={(e)=>{this.setState({mail:e.target.value})}}
           className={style.code}
           ></Input>
        <Button onClick={this.Code}>获取验证码</Button>
        </div>
        )
      }
}
export default Code