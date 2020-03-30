import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import User from './pages/User'
import Admins from './pages/Administrator'
import GoodsKind from './pages/GoodsKind/kindsList'
import Goods from './pages/Goods'
import Reg from './pages/Reg'
import Login from './pages/Login'
import kindsAdd from '../src/pages/GoodsKind/kindsAdd'
import kindsUpdata from '../src/pages/GoodsKind/kindsUpdata'
function App() {
  return (
    <HashRouter>
      <Route path='/reg' component={Reg}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/admin' render={() => {
        return (
          <Admin>
            <Route path='/admin/user' component={User}></Route>
            <Route path='/admin/goods' component={Goods}></Route>
            <Route path='/admin/administrator' component={Admins}></Route>
            <Route path='/admin/goodskind' component={GoodsKind}></Route>
            <Route path='/admin/kindsadd' component={kindsAdd}></Route>
            <Route path='/admin/kindsupdata/:id' component={kindsUpdata}></Route>
          </Admin>
        )
      }}></Route>
    </HashRouter>
  );
}

export default App;
