import { createApp } from 'vue';
import App from './App.vue';
import vuelidate from 'vuelidate';
import router from './router';
import store from './store';
import dayjs from 'dayjs';
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');
console.log(dayjs());

const app = createApp(App).use(router)

app.use(dayjs)
app.use(router)
app.use(store)
app.use(vuelidate)
app.mount('#app')

//Comment enregistrer les components en global pour les rendres disponiblent aux composants enfants?!!!

//Envelopper les éléments enfants dans l'élément parent unique du composant.