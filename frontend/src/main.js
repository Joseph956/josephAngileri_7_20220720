import { createApp } from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import router from './router';
import store from './store';
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');


const app = createApp(App).use(router)

app.use(router)
app.use(store)
app.use(Vuelidate)
app.mount('#app')

//Comment enregistrer les components en global pour les rendres disponiblent aux composants enfants?!!!

//Envelopper les éléments enfants dans l'élément parent unique du composant.