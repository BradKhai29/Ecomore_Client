<template>
    <div class="dropdown nav-icon">
        <button
            @click="showDropdown = !showDropdown"
            v-if="!isLogin"
            class="btn btn-link p-0 nav-icon"
        >
            <img class="w-100 h-100" src="../../assets/svgs/user.svg" />
        </button>
        <button
            @click="showDropdown = !showDropdown"
            v-if="isLogin"
            class="btn btn-link p-0 nav-icon h-100"
        >
            <img
                class="my-shadow border border-2 border-primary w-100 h-100 rounded-circle"
                :src="avatarUrl"
            />
        </button>
        <div
            v-show="showDropdown"
            class="my-dropdown-menu bg-white rounded py-2 my-shadow"
        >
            <button
                v-if="!isLogin"
                @click="toggleAuth"
                class="btn btn-light rounded-0 dropdown-item"
            >
                Đăng nhập
            </button>
            <button
                @click="goToOrderHistoryPage"
                class="btn btn-light rounded-0 dropdown-item"
            >
                Lịch sử mua
            </button>
            <button
                v-if="isLogin"
                @click="logout"
                class="btn btn-light rounded-0 dropdown-item"
            >
                Đăng xuất
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import userManager from "@/shared/UserManager";
import { authApi } from "@/shared/ApiUrls";

// Emit event list.
const toggleAuthEmitEvent = "toggle-auth";

export default {
    emits: [toggleAuthEmitEvent],
    data() {
        return {
            callbackId: null,
            isLogin: false,
            avatarUrl: null,
            showDropdown: false,
        };
    },
    mounted() {
        const randomNumber = Math.floor(Math.random() * 1000);
        this.callbackId = `login_button_${randomNumber}`;
        userManager.addLoginCallbacks(this.callbackId, this.updateLogin);
    },
    methods: {
        toggleAuth() {
            this.showDropdown = false;
            this.$emit(toggleAuthEmitEvent);
        },
        goToOrderHistoryPage() {
            this.showDropdown = false;
            this.$router.push("/order");
        },
        logout() {
            this.showDropdown = false;

            axios({
                url: authApi.logout.path,
                method: authApi.logout.method,
                headers: {
                    Authorization: `Bearer ${userManager.managedUser.accessToken}`,
                },
                data: {
                    refreshToken: userManager.managedUser.refreshToken,
                },
            })
            .then(() => {
                userManager.logout();
                this.isLogin = false;
                this.avatarUrl = null;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        updateLogin() {
            this.isLogin = userManager.managedUser.isAuthenticated;
            this.avatarUrl = userManager.managedUser.avatarUrl;
        },
    },
};
</script>

<style scoped>
.my-dropdown-menu {
    margin-top: 12px;
    position: absolute;
    right: 0;
    z-index: 900;
}
</style>