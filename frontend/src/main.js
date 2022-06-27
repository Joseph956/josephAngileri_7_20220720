import { createApp } from 'vue';
import vueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');

const app = createApp(App).use(router)

app.use(router)
app.use(store)
app.use(vueSweetalert2)
app.mount('#App')

//Comment enregistrer les components en global pour les rendres disponiblent aux composants enfants?!!!

//Envelopper les éléments enfants dans l'élément parent unique du composant.