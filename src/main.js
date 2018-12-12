import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material'

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(VueMaterial);
new Vue({
  render: h => h(App),
}).$mount('#app')
