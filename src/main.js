import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
var infiniteScroll = require("vue-infinite-scroll");
Vue.config.productionTip = false
Vue.use(infiniteScroll);

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
