import React from 'react';
import { HashRouter, Route ,Redirect} from 'react-router-dom'
import Admin from './pages/Admin'
import Discount from './pages/Discount'
import Admins from './pages/Administrator'

import GoodsList from './pages/Goods/GoodsList'
import GoodsAdd from './pages/Goods/GoodsAdd'
import GoodsUpdate from './pages/Goods/GoodsUpdate'

import kingList from './pages/GoodsKind/kindsList'

import Login from './pages/Login'
import kindsAdd from '../src/pages/GoodsKind/kindsAdd'
import kindsUpdata from '../src/pages/GoodsKind/kindsUpdata'
function App() {
  return (
    <HashRouter>
      <Redirect exact from='/' to ='/login'></Redirect>
      <Route path='/login' component={Login} ></Route>
      <Route path='/admin' component={() => {
        return (
          <Admin>
            <Redirect exact from='/' to ='/admin/goods'></Redirect>
            <Route path='/admin/discount' component={Discount}></Route>
            <Route path='/admin/goods' component={GoodsList}></Route>
            <Route path='/admin/goodsadd' component={GoodsAdd}></Route>
            <Route path='/admin/goodsupdate/:id' component={GoodsUpdate}></Route>
            <Route path='/admin/administrator' component={Admins}></Route>
            <Route path='/admin/goodskind' component={kingList}></Route>
            <Route path='/admin/kindsadd' component={kindsAdd}></Route>
            <Route path='/admin/kindsupdata/:id' component={kindsUpdata}></Route>
          </Admin>
        )
      }}></Route>
    </HashRouter>
  );
}

export default App;
