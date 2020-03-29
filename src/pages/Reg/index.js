import React, { Component } from 'react';
import api from '../../api/admin.js'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import style from './index.module.less'
import Code from '../Code'

class Reg extends Component {
  Reg=()=>{
    console.log('注册',this)
    let {validateFields} = this.props.form //用户获取表单数据的值
    // 获取输入值不管是否满足条件
    // let result = getFieldsValue()
    // console.log(result)
    // 校验输入的值
    validateFields((err,data)=>{
      console.log(err,data)
      if(err){
        // 输入错误
        message.error('输入有误请重试')
      }else{
        api.reg(data).then((res)=>{
          console.log(res)
          if(res.code === 404){
            message.error('用户名密码错误')
          }else{
            // 登录成功获取token并且保存到localstorage里 
            localStorage.setItem('token',res.token)
            message.success('注册成功，3s后跳转首页',3,()=>{
              this.props.history.replace('/login')
            })
          }
        })
      }
    })
  }
  // Code=()=>{
  //   console.log('查询数据',this)
  //   let {getFieldValue} = this.props.form //用户获取表单数据的值
  //   // 获取输入值不管是否满足条件
  //   let result = getFieldValue()
  //   console.log(result)
  // }
  render(){
    const { getFieldDecorator} = this.props.form;
    // getFieldDecorator返回一个高阶组件 用于和表单进行双向数据绑定
    return(
      <div className={style['login-box']}>

      <div className={style['login-form']}>
        {/* 用户名 */}
        <Form.Item>
          {/* userName 参数1获取第一个数据的key值 */}
          {getFieldDecorator('mail',{
            rules:[{requied:true,message:'用户名必须存在'},
            {pattern:/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,message:'请输入正确的邮箱'}
          ]
          })(
            <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="mail"
            />
            )}
          {/* {getFieldDecorator('mail',{
            rules:[{requied:true,message:'用户名必须存在'},
            {pattern:/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,message:'请输入正确的邮箱'}]
          })(
            <Button onClick={this.Code}>获取验证码</Button>
          )} */}
        </Form.Item>
        {/* 用户密码 */}
        <Form.Item>
          {getFieldDecorator('passWord',{
            rules:[{requied:true,message:'用户名必须存在'},
            {min:3,message:'用户名最小长度3位'},
            {max:9,message:'用户名最大长度9位'},
          ]
          })(
            <Input
            prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="pass"
            />
            )}
        </Form.Item>
        {/* 验证码 */}
        <Form.Item>
          {/* userName 参数1获取第一个数据的key值 */}
          {getFieldDecorator('code',{
            rules:[{requied:true,message:'用户名必须存在'},
          ]
          })(
            <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="code"
            />
            )}
        </Form.Item>
        {/* 记住我  提交*/}
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <Button type="primary" onClick={this.Reg} className="login-form-button">
            register in
          </Button>
          <Code></Code>
        </Form.Item>
      </div>
    </div>
    )
  }
  
}
// 通你Form 下的create的方法将组件进行处理  会将antd里的方法注册到 当前组件的Props里
export default  Form.create()(Reg);