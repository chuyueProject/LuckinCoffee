import React, { Component } from 'react';
import CustomNav from '../../components/CustomNav'
import { Layout } from 'antd';
import style from './index.module.less'
const { Header, Content, Footer, Sider } = Layout;
class Admin extends Component {
  state = {}
  render() {
    return (
      <Layout className={style.wrapper}>
        {/* 侧边栏 */}
        <Sider>
          <div className="logo" />
          <CustomNav></CustomNav>
        </Sider>
        {/* style={ {background:'#fff'} } */}
        <Layout >
          <Header  >
            <h1 style={{ color:' rgba(255, 255, 255, 0.65)' }}>欢迎来到瑞幸咖啡管理后台！</h1>
          </Header>
          <Content >
            {this.props.children}
          </Content>
          <Footer > Design ©2020 Created by QianFeng</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;