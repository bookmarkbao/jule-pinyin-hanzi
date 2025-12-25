import { createApp } from 'vue'
import './style.css'
// 2. Import the components style
import 'vant/lib/index.css';
import App from './App.vue'
import { initVConsole } from '@/lib/vconsole'

void initVConsole()
createApp(App).mount('#app')
