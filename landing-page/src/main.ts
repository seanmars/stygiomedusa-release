import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// 單頁網站, 不使用 router.
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
