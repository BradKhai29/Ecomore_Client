import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// Import all views.
import HomePage from "./views/HomePage.vue";

function doNothing() {
	return 0;
}
const app = createApp(App);
/*
	product-item: call-api (success) => emit
	=> page
	=> app
	+ Update cart
	+ Call to navigation bar to re-render.
	+ Call to hidden cart-sidebar to re-render
*/
const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: "/", component: HomePage }],
	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
	scrollBehavior(to, from, savedPosition) {
		doNothing(to, from, savedPosition);
		if (savedPosition) {
			return savedPosition;
		}
		return { left: 0, top: 0 };
	}
});

app.use(router);
app.mount("#app");
