<template>
    <div class="auth-form row align-items-center justify-content-center">
        <section class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
            <section class="form-block mx-auto">
                <div class="d-flex align-items-center mb-5">
                    <h4 class="m-0">
                        Đăng nhập
                        <span class="text-primary">Ecomorɘ</span>
                    </h4>
                    <span
                        @click="toggleAuth"
                        class="ms-auto btn btn-white bg-light border border-2 border-dark"
                    >
                        &#x2716;
                    </span>
                </div>
                <form @submit.prevent="" class="text-start d-flex flex-column">
                    <section class="form-group first mb-3">
                        <AuthInput
                            :displayErrorMessage="true"
                            :inputId="email"
                            inputLabel="Email"
                            inputType="email"
                            :isRequired="true"
                            placeholder="Nhập email của bạn"
                            inputErrorMessage="Vui lòng nhập email hợp lệ"
                            @input-update="(value) => (email = value)"
                            @validate-input="addValidationCallback">
                        </AuthInput>
                    </section>
                    <section class="form-group d-flex flex-column last mb-3">
                        <PasswordInput
                            :forLoginPurpose="true"
                            :inputValue="password"
                            @input-update="(value) => (password = value)"
                            @change-to-forgot="changeToForgotPassword"
                            @validate-input="addValidationCallback">
                        </PasswordInput>
                    </section>

                    <button
                        @click="login"
                        type="button"
                        class="btn btn-block py-2 btn-primary flex-fill"
                    >
                        Đăng nhập
                    </button>

                    <strong class="text-center my-3 d-block">HOẶC</strong>

                    <div class="d-flex mb-4 my-shadow rounded">
                        <button
                            href="#"
                            class="d-flex flex-fill align-items-center btn py-2"
                        >
                            <img
                                class="btn btn-light"
                                src="../../../assets/svgs/google.svg"
                                alt=""
                                srcset=""
                            />
                            <span class="flex-fill">
                                Đăng nhập với Google
                            </span>
                        </button>
                    </div>
                    <div class="d-flex justify-content-center mb-2">
                        <span class="me-2">Chưa có tài khoản?</span>
                        <a
                            @click="changeToRegister"
                            href="#"
                            class="text-primary fw-bold"
                            >Đăng ký ngay</a
                        >
                    </div>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import { authApi } from "@/shared/ApiUrls";
import CookieHelper from "@/shared/helpers/CookieHelper";
import {
    AccessTokenCookieName,
    RefreshTokenCookieName,
} from "@/shared/AppConstants";
import userManager from "@/shared/UserManager";

// Import components.
import AuthInput from "./AuthInput.vue";
import PasswordInput from "./PasswordInput.vue";

const toggleAuthEmitEvent = "toggle-auth";
const toRegisterEmitEvent = "to-register";
const toForgotPasswordEmitEvent = "to-forgot-password";

export default {
    emits: [
        toggleAuthEmitEvent,
        toRegisterEmitEvent,
        toForgotPasswordEmitEvent,
    ],
    components: {
        AuthInput,
        PasswordInput
    },
    data() {
        return {
            email: null,
            password: null,
            formValidationCallbacks: [],
        };
    },
    methods: {
        addValidationCallback(callback) {
            this.formValidationCallbacks.push(callback);
        },
        toggleAuth() {
            this.$emit(toggleAuthEmitEvent);
        },
        changeToRegister() {
            this.$emit(toRegisterEmitEvent);
        },
        changeToForgotPassword() {
            this.$emit(toForgotPasswordEmitEvent);
        },
        login() {
            let isValidToLogin = true;

            for (const validationCallback of this.formValidationCallbacks) {
                isValidToLogin &= validationCallback();
            }

            if (!isValidToLogin) {
                return;
            }

            axios({
                url: authApi.login.path,
                method: authApi.login.method,
                data: {
                    email: this.email,
                    password: this.password,
                },
            })
            .then((response) => {
                const body = response.data.body;

                const accessToken = body.accessToken;
                const refreshToken = body.refreshToken;

                CookieHelper.setCookie(
                    AccessTokenCookieName,
                    accessToken,
                    7
                );
                CookieHelper.setCookie(
                    RefreshTokenCookieName,
                    refreshToken,
                    7
                );

                // Emit the toggle auth event to close the login modal.
                this.$emit(toggleAuthEmitEvent);

                // Get token stored from the cookies and manage.
                userManager.getTokenFromCookie();

                userManager.verifyAuthentication().then(() => {
                    if (userManager.managedUser.isAuthenticated) {
                        userManager.login();
                    }
                });
            })
            .catch((err) => console.log(err));
        },
    },
};
</script>