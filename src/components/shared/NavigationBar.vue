<template>
    <!-- Navbar Start -->
    <section class="container-fluid p-0 bg-primary">
        <section class="container py-2">
            <section class="row flex-row text-light">
                <div class="col-12 col-sm-6 mb-2 mb-sm-0 d-flex align-items-center justify-content-sm-start justify-content-center">
                    <span class="text-light-100">
                        <i class="fa-solid fa-bell fa-lg"></i>
                        <span class="ms-2">Ưu đãi 10% cho đơn hàng đầu tiên</span>
                    </span>
                </div>
                <div class="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center">
                    <a href="https://www.facebook.com/ecomore.vn"
                    class="btn btn-outline-light rounded-circle d-flex align-items-center"
                    target="_blank" rel="noopener noreferrer" style="padding: 0 14px">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <span class="py-2 d-flex align-items-center mx-3">
                        <span class="border border-1 border-light h-100"></span>
                    </span>
                    <LoginButton></LoginButton>
                </div>
            </section>
        </section>

        <section class="my-navbar bg-light my-text-light container-fluid nav-bar sticky-top mt-0 p-0">
            <section class="container">
                <nav class="navbar container flex-column navbar-expand-lg navbar-light p-0">
                    <div class="row w-100">
                        <section class="col-4 p-0 d-flex align-items-center">
                            <button
                                type="button"
                                class="navbar-toggler btn"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <i class="fa-solid fa-bars"></i>
                            </button>
                            <ul class="navbar-collapse collapse navbar-nav text-start">
                                <li class="nav-item">
                                    <router-link to="/" class="nav-link"
                                        >Trang chủ</router-link
                                    >
                                </li>
                                <li class="nav-item">
                                    <router-link to="/products" class="nav-link">
                                        Sản phẩm
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/calories" class="nav-link">
                                        Calories
                                    </router-link>
                                </li>
                            </ul>
                        </section>
                        <section class="col-4 d-flex align-items-center justify-content-center">
                            <router-link
                                to="/"
                                class="navbar-brand d-flex me-0 align-items-center justify-content-center"
                            >
                                <div
                                    class="icon p-0 overflow-hidden me-sm-2"
                                    style="width: 48px; height: 48px"
                                >
                                    <img
                                        class="w-100 h-100"
                                        src="@/assets/logo.jpg"
                                        alt="Icon"
                                    />
                                </div>
                                <h3 class="m-0 text-primary d-none d-sm-inline">
                                    <span class="text-dark">Eco</span>
                                    <span class="text-primary">morɘ</span>
                                </h3>
                            </router-link>
                        </section>

                        <!-- Display for mobile mode. -->
                        <section class="col-4 p-0 d-flex align-items-center flex-row justify-content-end  d-flex d-lg-none">
                            <CartButton @click="toggleCart"></CartButton>
                        </section>
                        <!-- Display for desktop mode -->
                        <section class="col-4 p-0 d-flex align-items-center justify-content-end flex-row d-lg-flex d-none">
                            <CartButton @click="toggleCart"></CartButton>
                        </section>
                    </div>
                    <div class="row w-100 d-block d-md-none">
                        <ul class="navbar-collapse collapse navbar-nav" id="navbarCollapse">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link"
                                    >Trang chủ</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link to="/products" class="nav-link">
                                    Sản phẩm
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/calories" class="nav-link">
                                    Calories
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        </section>
    </section>
    <!-- Navbar End -->

    <!-- Shopping Cart Section Start -->
    <section
        v-show="showCart"
        @click="hideCart"
        :class="['cart-modal container-fluid', toggleCartClass]"
    >
        <ShoppingCart @toggle-cart="toggleCart"></ShoppingCart>
    </section>
    <!-- Shopping Cart Section End -->
</template>

<script>
import ShoppingCart from "../feats/shoppingCarts/ShoppingCart.vue";
import CartButton from "./CartButton.vue";
import LoginButton from "./LoginButton.vue";
import userManager from "../../shared/UserManager";

export default {
    name: "NavigationBar",
    components: {
        ShoppingCart,
        CartButton,
        LoginButton,
    },
    data() {
        return {
            showCart: false,
            toggleCartClass: "toggleCart",
        };
    },
    mounted() {
        userManager.getTokenFromCookie();
        userManager.verifyAuthentication().then(() => {
            if (userManager.managedUser.isAuthenticated) {
                userManager.login();
            }
        });
    },
    methods: {
        toggleCart() {
            this.showCart = !this.showCart;
        },
        hideCart(event) {
            if (event.target.classList.contains(this.toggleCartClass)) {
                this.showCart = false;
            }
        },
    },
};
</script>

<style scoped>
.my-navbar {

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
}

.my-navbar .navbar {
    box-shadow: none !important;
}

.nav-icon {
    --size: 32px;
    width: var(--size);
    height: var(--size);
    margin-left: 1rem;
}

.auth-modal,
.cart-modal {
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    background-color: rgba(122, 121, 121, 0.5);
}
</style>
