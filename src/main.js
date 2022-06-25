import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store/vuex'
import router from './router/index'
import http from 'axios'
import '../src/api/mock'

Vue.config.productionTip = false
Vue.use(Element)

Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')