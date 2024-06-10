import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// Import all views.
import HomePage from "./views/HomePage.vue";
import ProductsPage from "./views/products/ProductsPage.vue";
import ProductDetailPage from "./views/products/ProductDetailPage.vue";
import CheckoutPage from "./views/checkouts/CheckoutPage.vue";
import CheckoutDetailPage from "./views/checkouts/CheckoutDetailPage.vue";
import CheckoutPaymentPage from "./views/checkouts/CheckoutPaymentPage.vue";
import OrderHistoryPage from "./views/orders/OrderHistoryPage.vue";
import OrderDetailPage from "./views/orders/OrderDetailPage.vue";
import CaloriesPage from "./views/calories/CaloriesPage.vue";

function doNothing() {
	return 0;
}

const app = createApp(App);

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: HomePage },
		{ path: "/home", component: HomePage },
		{ path: "/products", component: ProductsPage },
		{ path: "/product/:id", component: ProductDetailPage },
		{ path: "/checkout", component: CheckoutPage },
		{ path: "/checkout/detail", component: CheckoutDetailPage },
		{ path: "/checkout/confirm", component: CheckoutPaymentPage },
		{ path: "/checkout/cancel", component: CheckoutPaymentPage },
		{ path: "/checkout/payment", component: CheckoutPaymentPage },
		{ path: "/order", component: OrderHistoryPage },
		{ path: "/order/:orderId", component: OrderDetailPage },
		{ path: "/calories", component: CaloriesPage }
	],
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
