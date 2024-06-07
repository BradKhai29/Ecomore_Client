<template>
    <!-- Navbar Start -->
    <section class="my-navbar container-fluid nav-bar sticky-top mt-0 p-0">
        <section class="container">
            <nav class="navbar navbar-expand-lg navbar-light p-0">
                <button
                    type="button"
                    class="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <router-link
                    to="/"
                    class="navbar-brand d-flex me-0 align-items-center text-center"
                >
                    <div
                        class="icon p-0 overflow-hidden me-2"
                        style="width: 48px; height: 48px"
                    >
                        <img
                            class="w-100 h-100"
                            src="../../assets/logo.jpg"
                            alt="Icon"
                        />
                    </div>
                    <h1 class="m-0 text-primary">
                        <span class="text-dark">Eco</span>
                        <span class="text-primary">morɘ</span>
                    </h1>
                </router-link>
                <!-- Display for mobile mode. -->
                <section class="flex-row d-flex d-lg-none">
                    <a
                        href="#"
                        @click="toggleAuth"
                        :class="['nav-icon', toggleAuthClass]"
                    >
                        <img class="w-100" src="../../assets/svgs/user.svg" />
                    </a>
                    <CartButton @click="toggleCart"></CartButton>
                </section>
                <section class="navbar-collapse collapse" id="navbarCollapse">
                    <ul class="navbar-nav ms-auto text-start">
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
                            <router-link to="/products" class="nav-link">
                                Liên hệ
                            </router-link>
                        </li>
                    </ul>
                </section>
                <!-- Display for desktop mode -->
                <section class="flex-row d-lg-flex d-none">
                    <CartButton @click="toggleCart"></CartButton>
                    <button
                        @click="toggleAuth"
                        :class="['btn btn-link p-0 nav-icon', toggleCartClass]"
                    >
                        <img class="w-100" src="../../assets/svgs/user.svg" />
                    </button>
                </section>
            </nav>
        </section>
    </section>
    <!-- Navbar End -->

    <!-- Auth Section Start -->
    <section
        v-show="showAuth"
        @click="hideAuth"
        :class="['auth-modal container-fluid',toggleAuthClass]"
    >
        <AuthSection @toggle-auth="toggleAuth" v-show="showAuth"></AuthSection>
    </section>
    <!-- Auth Section End -->

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
import AuthSection from "../feats/auths/AuthSection.vue";
import ShoppingCart from "../feats/shoppingCarts/ShoppingCart.vue";
import CartButton from './CartButton.vue';

export default {
    name: "NavigationBar",
    components: {
        AuthSection,
        ShoppingCart,
        CartButton
    },
    data() {
        return {
            showCart: false,
            showAuth: false,
            toggleAuthClass: "toggleAuth",
            toggleCartClass: "toggleCart",
        };
    },
    methods: {
        toggleCart() {
            this.showCart = !this.showCart;
        },
        toggleAuth() {
            this.showAuth = !this.showAuth;
        },
        hideAuth(event) {
            if (event.target.classList.contains(this.toggleAuthClass)) {
                this.showAuth = false;
            }
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
    background-color: rgb(248, 241, 228) !important;
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
