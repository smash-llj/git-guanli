import Vue from 'vue'
import App from './App.vue'
import { Container, Aside, Header, Main, Menu, Submenu, MenuItem, MenuItemGroup, Button, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Input, Breadcrumb, BreadcrumbItem, Form, FormItem, Option, Select, DatePicker, Switch, Dialog, Pagination } from 'element-ui';
Vue.config.productionTip = false
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(Pagination)
import router from '../src/router/index'
import store from '../src/store/index'
import http from 'axios'
import '../api/mock.js'
Vue.prototype.$http = http
//路由前置守卫
router.beforeEach((to, from, next) => {
  store.commit('GETTOKEN')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  }
  else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this  //安装全局事件总线
  }
}).$mount('#app')
