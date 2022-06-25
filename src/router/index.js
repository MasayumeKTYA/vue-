import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main'
//import Home from '../views/home/index'
//import User from '../views/User/index'
import Login from '../views/Login'
//import Mall from '../views/mall/index'
//import Page1 from '../views/other/page1'
//import Page2 from '../views/other/page2'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [],
}, {
    path: '/login',
    name: 'login',
    component: Login,
}]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router