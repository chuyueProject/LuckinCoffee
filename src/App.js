import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import User from './pages/User'
import Admins from './pages/Administrator'
import GoodsKind from './pages/GoodsKind'
import GoodsList from './pages/Goods/GoodsList'
import GoodsAdd from './pages/Goods/GoodsAdd'
import GoodsUpdate from './pages/Goods/GoodsUpdate'
import Login from './pages/Login'


function App() {
  return (
    <HashRouter>
      <Route path='/login' component={Login}></Route>
      <Route path='/admin' render={() => {
        return (
          <Admin>
            <Route path='/admin/user' component={User}></Route>
            <Route path='/admin/goods' component={GoodsList}></Route>
            <Route path='/admin/goodsadd' component={GoodsAdd}></Route>
            <Route path='/admin/goodsupdate/:id' component={GoodsUpdate}></Route>
            <Route path='/admin/administrator' component={Admins}></Route>
            <Route path='/admin/goodskind' component={GoodsKind}></Route>
          </Admin>
        )
      }}></Route>
    </HashRouter>
  );
}

export default App;
