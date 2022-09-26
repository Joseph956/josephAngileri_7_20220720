import { createApp } from 'vue';
import App from './App.vue';
import vuelidate from 'vuelidate';
import router from './router';
import store from './store';
import dayjs from 'dayjs';
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');
console.log(dayjs());

// vue.prototype.dayjs = dayjs;

const app = createApp(App).use(router)

app.use(dayjs)
app.use(store)
app.use(vuelidate)
app.mount('#app')
