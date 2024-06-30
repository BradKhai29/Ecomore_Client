import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import bootstrap_min_css from "./assets/css/bootstrap.min.css";
import style_css from "./assets/css/style.css";
import animate_css from "./assets/lib/animate/animate.min.css";

const app = createApp(App);

// Configure app.
app.use(router);
app.use(bootstrap_min_css);
app.use(style_css);
app.use(animate_css);

app.mount("#app");
