<template>
    <BaseLayout>
        <div class="auth-form row mt-5 align-items-center justify-content-center">
            <section class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
                <section class="form-block mx-auto">
                    <div class="d-flex align-items-center mb-5">
                        <h4 class="m-0">
                            Đăng nhập
                            <span class="text-primary">Ecomorɘ</span>
                        </h4>
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
                                @change-to-forgot="goToForgotPasswordPage"
                                @validate-input="addValidationCallback">
                            </PasswordInput>
                        </section>

                        <button
                            @click="login"
                            type="button"
                            class="btn btn-block py-2 btn-primary flex-fill"
                            :disabled="isProcessing"
                        >
                            <span v-if="!isProcessing">Đăng nhập</span>
                            <span v-if="isProcessing" class="d-flex justify-content-center">
                                <LoadingIcon :isLight="true"/> <span class="ms-3">Đang xử lý</span>
                            </span>
                        </button>

                        <strong class="text-center my-3 d-block">HOẶC</strong>

                        <div class="d-flex mb-4 my-shadow rounded">
                            <GoogleAuthButton />
                        </div>
                        <div class="d-flex justify-content-center mb-2">
                            <span class="me-2">Chưa có tài khoản?</span>
                            <router-link
                                to="/register"
                                class="text-primary fw-bold"
                                >Đăng ký ngay
                            </router-link>
                        </div>
                    </form>
                </section>
            </section>
        </div>
    </BaseLayout>
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
import BaseLayout from "@/layouts/BaseLayout.vue";
import AuthInput from "@/components/feats/auths/AuthInput.vue";
import PasswordInput from "@/components/feats/auths/PasswordInput.vue";
import GoogleAuthButton from "@/components/feats/auths/GoogleAuthButton.vue";
import LoadingIcon from "@/components/shared/LoadingIcon.vue";


export default {
    components: {
        BaseLayout,
        AuthInput,
        PasswordInput,
        GoogleAuthButton,
        LoadingIcon,
    },
    data() {
        return {
            email: null,
            password: null,
            isProcessing: false,
            formValidationCallbacks: [],
        };
    },
    methods: {
        addValidationCallback(callback) {
            this.formValidationCallbacks.push(callback);
        },
        goToForgotPasswordPage() {
            this.$router.push("/forgot-password");
        },
        login() {
            let isValidToLogin = true;

            for (const validationCallback of this.formValidationCallbacks) {
                isValidToLogin &= validationCallback();
            }

            if (!isValidToLogin) {
                return;
            }

            if (this.isProcessing) {
                return;
            }

            // Set processing to prevent user re-submit the form.
            this.isProcessing = true;
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

                // Get token stored from the cookies and manage.
                userManager.getTokenFromCookie();

                this.isProcessing = false;

                userManager.verifyAuthentication().then(() => {
                    if (userManager.managedUser.isAuthenticated) {
                        userManager.login();
                        this.$router.push("/");
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                this.isProcessing = false;
            });
        },
    },
};
</script>