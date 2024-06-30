<template>
    <BaseLayout>
        <div class="auth-form row mt-5 align-items-center justify-content-center">
            <!-- Register Start -->
            <section
                v-if="!showSuccessPopup"
                class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white"
            >
                <div class="form-block mx-auto">
                    <div class="d-flex align-items-center mb-5">
                        <h4 class="m-0 text-center">
                            Đăng ký
                            <span class="text-primary">Ecomorɘ</span>
                        </h4>
                    </div>
                    <form @submit.prevent="" class="text-start d-flex flex-column">
                        <section class="d-flex">
                            <section class="form-group me-1 mb-3 mb-md-2">
                                <AuthInput
                                    inputId="lastName"
                                    inputLabel="Họ"
                                    inputType="text"
                                    :isRequired="true"
                                    placeholder="Họ của bạn"
                                    @input-update="(value) => (lastName = value)"
                                    @validate-input="addValidationCallback"
                                >
                                </AuthInput>
                            </section>
                            <section class="form-group flex-fill ms-1 mb-3 mb-md-2">
                                <AuthInput
                                    inputId="firstName"
                                    inputLabel="Tên"
                                    inputType="text"
                                    :isRequired="true"
                                    placeholder="Tên của bạn"
                                    @input-update="(value) => (firstName = value)"
                                    @validate-input="addValidationCallback"
                                >
                                </AuthInput>
                            </section>
                        </section>
                        <section class="form-group first mb-1">
                            <AuthInput
                                :displayErrorMessage="true"
                                :inputId="email"
                                inputLabel="Email"
                                inputType="email"
                                :isRequired="true"
                                placeholder="Nhập email của bạn"
                                inputErrorMessage="Vui lòng nhập email hợp lệ"
                                @input-update="(value) => (email = value)"
                                @validate-input="addValidationCallback"
                            >
                            </AuthInput>
                        </section>
                        <section class="form-group d-flex flex-column last mb-3">
                            <PasswordInput
                                :inputValue="password"
                                @input-update="(value) => (password = value)"
                                @change-to-forgot="changeToForgotPassword"
                                @validate-input="addValidationCallback"
                            >
                            </PasswordInput>
                        </section>

                        <button
                            @click="register"
                            type="button"
                            class="btn btn-block py-2 btn-primary flex-fill"
                            :disabled="isProcessing"
                        >
                            <span v-if="!isProcessing">Đăng ký</span>
                            <span v-if="isProcessing" class="d-flex justify-content-center">
                                <LoadingIcon :isLight="true"/> <span class="ms-3">Đang xử lý</span>
                            </span>
                        </button>

                        <strong class="text-center my-3 d-block">HOẶC</strong>

                        <div class="d-flex mb-4 my-shadow rounded">
                            <GoogleAuthButton />
                        </div>
                        <div class="d-flex justify-content-center mb-2">
                            <span class="me-2">Đã có tài khoản?</span>
                            <router-link to="/login"
                                class="text-primary fw-bold">
                                Đăng nhập ngay
                            </router-link>
                        </div>
                    </form>
                </div>
            </section>
            <!-- Register End -->

            <!-- Popup Register Success Start -->
            <section
                v-if="true"
                class="col-md-4 col-sm-6 register rounded py-3 bg-white my-shadow"
            >
                <div class="form-block">
                    <div class="text-center">
                        <h3 class="bg-primary py-4 rounded">
                            <img src="@/assets/icons/mail.png"/>
                        </h3>
                    </div>

                    <footer class="d-flex flex-column">
                        <p class="fw-bold my-3">
                            Vui lòng kiểm tra mail ở mục thông thường hoặc mục spam để lấy link xác nhận đăng ký
                        </p>
                        <section class="d-flex mb-4 register rounded">
                            <div
                                class="rounded my-shadow border-primary d-flex flex-fill align-items-center btn py-2"
                            >
                                <span class="flex-fill text-start">
                                    Chưa nhận được mail
                                </span>
                                <button @click="resendRegisterEmail" :disabled="resendMailCountDown > 0" class="btn btn-primary">
                                    Gửi lại
                                    <span v-if="resendMailCountDown > 0">
                                        sau ({{ resendMailCountDown }})
                                    </span>
                                </button>
                            </div>
                        </section>
                        <div class="d-flex justify-content-center">
                            <span class="me-1">Quay lại</span>
                            <router-link to="/login" class="text-primary fw-bold">
                                đăng nhập
                            </router-link>
                        </div>
                    </footer>
                </div>
            </section>
            <!-- Popup Register Success End -->
        </div>
    </BaseLayout>
</template>

<script>
import axios from "axios";
import { authApi } from "@/shared/ApiUrls";

// Import components.
import AuthInput from "@/components/feats/auths/AuthInput.vue";
import PasswordInput from "@/components/feats/auths/PasswordInput.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import LoadingIcon from "@/components/shared/LoadingIcon.vue";
import GoogleAuthButton from "@/components/feats/auths/GoogleAuthButton.vue";

export default {
    components: {
        BaseLayout,
        AuthInput,
        PasswordInput,
        LoadingIcon,
        GoogleAuthButton
    },
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            isProcessing: false,
            showSuccessPopup: false,
            formValidationCallbacks: [],
            resendMailCountDown: 0,
            countDownIntervalId: null,
        };
    },
    methods: {
        addValidationCallback(callback) {
            this.formValidationCallbacks.push(callback);
        },
        register() {
            let isValidToLogin = true;

            for (const validationCallback of this.formValidationCallbacks) {
                isValidToLogin &= validationCallback();
            }

            if (!isValidToLogin) {
                return;
            }

            // If the request is in processing, prevent user to re-submit the form.
            if (this.isProcessing) {
                return;
            }

            this.isProcessing = true;
            axios({
                url: authApi.register.path,
                method: authApi.register.method,
                data: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                }
            })
            .then(() => {
                this.showSuccessPopup = true;
                this.isProcessing = false;
            })
            .catch(err => {
                console.log(err);
                this.isProcessing = false;
            });
        },
        resendRegisterEmail() {
            // Check if the resend mail counter is larger than 0 or not
            // to prevent user re-submitting the form.
            if (this.resendMailCountDown > 0) {
                return;
            }

            // Set the resend mail count down to 60 seconds.
            this.resendMailCountDown = 60;

            this.countDownIntervalId = setInterval(() => {
                if (this.resendMailCountDown > 0) {
                    this.resendMailCountDown--;
                }
                else {
                    this.stopCountDown();
                }
            }, 1000);
        },
        stopCountDown() {
            clearInterval(this.countDownIntervalId);
        },
    },
};
</script>