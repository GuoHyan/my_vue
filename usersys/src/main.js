// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import System from './components/System'
import CustomerDetails from './components/CustomerDetails'
import Edit from './components/Edit'

//必须注释掉routes 和router,不然下面的设置路由的const router会出错,不然不注释掉
// import routes from './routes'
// import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

//设置路由
const router=new VueRouter({
   mode:"history",
    base:__dirname,
    routes:[
      {path:"/",component:Customers},
      {path:"/about",component:About},
      {path:"/add",component:Add},
      {path:"/System",component:System},
      {path:"/customer/:id",component:CustomerDetails},
      {path:"/edit/:id",component:Edit},
    ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template:`
  <div id="app">
       <nav class="navbar navbar-default">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">用户管理系统</a>
              </div>
              <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                  <li><router-link to="/">主页</router-link></li>
                  <li><router-link to="/about">关于我们</router-link></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                  <li><router-link to="/add">添加用户</router-link></li>
                  <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">系统管理<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                              <li><router-link to="/System">个人信息</router-link></li>
                              <li><a href="#">修改密码</a></li>
                              <li role="separator" class="divider"></li>
                              <li><router-link to="/System">管理中心</router-link></li>
                              <li><a href="#">权限管理</a></li>
                              <li role="separator" class="divider"></li>
                              <li><a href="#">聊天室</a></li>
                            </ul>
                  </li>
                </ul>
              </div><!--/.nav-collapse -->
            </div>
          </nav>
      <router-view></router-view>
   </div>
   `
}).$mount("#app")
