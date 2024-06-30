<template>
    <div class="dropdown">
        <router-link
            v-if="!isLogin"
            to="/login"
            class="btn btn-outline-light rounded-pill h-100 d-flex align-items-center"
        >
            <span><i class="fa-regular fa-user fa-sm"></i></span>
            <span class="ms-1 flex-fill">Thành viên</span>
        </router-link>
        <button
            @click="showDropdown = !showDropdown"
            v-if="isLogin"
            class="btn btn-link p-0" style="height: 36px;"
        >
            <img
                class="my-shadow w-100 h-100 rounded-circle"
                :src="avatarUrl"
            />
        </button>
        <div
            v-show="showDropdown"
            class="my-dropdown-menu bg-white rounded py-2 my-shadow"
        >
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

export default {
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
        goToLoginPage() {
            this.$router.push("/login");
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