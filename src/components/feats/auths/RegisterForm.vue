<template>
    <div class="auth-form row align-items-center justify-content-center">
        <!-- Register Start -->
        <section
            v-if="!showSuccessPopup"
            class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white"
        >
            <div class="form-block mx-auto">
                <div class="d-flex align-items-center mb-5">
                    <h4 class="m-0">
                        Đăng ký
                        <span class="text-primary">Ecomorɘ</span>
                    </h4>
                    <span
                        @click="toggleAuth"
                        class="ms-auto toggleAuth btn btn-white bg-light border border-2 border-dark"
                    >
                        &#x2716;
                    </span>
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
                        <section class="form-group ms-1 mb-3 mb-md-2">
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
                    >
                        Đăng ký
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
                            <span class="flex-fill"> Đăng ký với Google </span>
                        </button>
                    </div>
                    <div class="d-flex justify-content-center mb-2">
                        <span class="me-2">Đã có tài khoản?</span>
                        <a
                            @click="changeToLogin"
                            href="#"
                            class="text-primary fw-bold"
                            >Đăng nhập ngay</a
                        >
                    </div>
                </form>
            </div>
        </section>
        <!-- Register End -->

        <!-- Popup Register Success Start -->
        <section
            v-if="showSuccessPopup"
            class="col-md-4 col-sm-6 register rounded py-3 bg-white"
        >
            <div class="form-block">
                <div class="d-flex mb-2">
                    <span
                        @click="toggleAuth"
                        class="ms-auto toggleAuth btn btn-white bg-light border border-2 border-dark"
                    >
                        &#x2716;
                    </span>
                </div>
                <div class="text-center">
                    <h3 class="bg-primary py-4 rounded">
                        <img
                            src="../../../assets/icons/mail.png"
                            alt=""
                            srcset=""
                        />
                    </h3>
                </div>

                <footer class="d-flex flex-column">
                    <p class="fw-bold my-3">
                        Vui lòng kiểm tra mail để hoàn tất đăng ký
                    </p>
                    <section class="d-flex mb-4 register rounded">
                        <div
                            class="rounded my-shadow border-primary d-flex flex-fill align-items-center btn py-2"
                        >
                            <span class="flex-fill text-start">
                                Chưa nhận được mail
                            </span>
                            <button class="btn btn-primary">Gửi lại</button>
                        </div>
                    </section>
                    <div class="d-flex justify-content-center">
                        <span class="me-1">Quay lại</span>
                        <a
                            @click="changeToLogin"
                            href="#"
                            class="text-primary fw-bold"
                            >đăng nhập</a
                        >
                    </div>
                </footer>
            </div>
        </section>
        <!-- Popup Register Success End -->
    </div>
</template>

<script>
import axios from "axios";
import { authApi } from "@/shared/ApiUrls";
const toLoginEmitEvent = "to-login";
const toggleAuthEmitEvent = "toggle-auth";

// Import components.
import AuthInput from "./AuthInput.vue";
import PasswordInput from "./PasswordInput.vue";

export default {
    emits: [toggleAuthEmitEvent, toLoginEmitEvent],
    components: {
        AuthInput,
        PasswordInput,
    },
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            showSuccessPopup: false,
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
        changeToLogin() {
            this.showSuccessPopup = false;
            this.$emit(toLoginEmitEvent);
        },
        register() {
            let isValidToLogin = true;

            for (const validationCallback of this.formValidationCallbacks) {
                isValidToLogin &= validationCallback();
            }

            if (!isValidToLogin) {
                return;
            }

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
            })
            .catch(err => console.log(err));
        },
    },
};
</script>