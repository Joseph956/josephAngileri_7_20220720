import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App).use(router)

app.use(router)
app.use(store)
// app.component('my-heading', {
//     props: ['text'],
//     template: '<h1>{{ text }}</h1'
// })

app.mount('#app')
