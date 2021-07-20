import { createApp } from "vue"
import App from "./app.vue"
import router from "./router"
import "./plugins/register-service-worker"
import "./styles/tailwind.css"

createApp(App).use(router).mount("#app")
