import { createApp } from "vue"
import App from "./app.vue"
import "./plugins/register-service-worker"
import router from "./router"

createApp(App).use(router).mount("#app")
