/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import ApiService from './services/api_service'
import TokenService from './services/token_services'

import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { socialMediaStore } from './store.js'

import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any successful response status code
    return response;
  },
  function (error) {
    const errorMessage = socialMediaStore().constructError(error)
    socialMediaStore().error = errorMessage
    if (error.response?.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);


loadFonts()

if (TokenService.getToken()) {
    ApiService.setHeader()
    // ApiService.mount401Interceptor()
  }

// Create vue app
const app = createApp(App)
const pinia = createPinia();


// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)

// Mount vue app
app.mount('#app')
