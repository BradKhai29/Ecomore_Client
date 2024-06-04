<template>
    <div
        @click="toggleAuth"
        class="row align-items-center justify-content-center toggleAuth"
    >
        <section class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
            <section class="form-block mx-auto">
                <div class="d-flex align-items-center mb-5">
                    <h4 class="m-0">
                        Đăng nhập
                        <span class="text-primary">Ecomorɘ</span>
                    </h4>
                    <img
                        class="toggleAuth ms-auto btn btn-white"
                        src="../../../assets/cross_icon.png"
                    />
                </div>
                <form @submit.prevent="" class="text-start d-flex flex-column">
                    <section class="form-group first mb-3">
                        <label for="email">
                            Email<span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="your-email@gmail.com"
                            id="email"
                        />
                    </section>
                    <section class="form-group d-flex flex-column last mb-3">
                        <div class="d-flex">
                            <label for="password">
                                Mật khẩu<span class="text-danger">*</span>
                            </label>
                            <a @click="changeToForgotPassword" href="#" class="ms-auto fw-bold"
                                >Quên mật khẩu?</a
                            >
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="password"
                                class="form-control"
                                placeholder="Nhập mật khẩu của bạn"
                                id="password"
                            />
                            <span class="input-group-text" id="basic-addon1"
                                >@</span
                            >
                        </div>
                    </section>

                    <button class="btn btn-block py-2 btn-primary flex-fill">
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
                                src="../../../assets/google.svg"
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
                        <a @click="changeToRegister" href="#" class="text-primary fw-bold"
                            >Đăng ký ngay</a
                        >
                    </div>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
const toggleAuthEmitEvent = "toggle-auth";
const toRegisterEmitEvent = "to-register";
const toForgotPasswordEmitEvent = "to-forgot-password";

export default {
    emits: [toggleAuthEmitEvent, toRegisterEmitEvent, toForgotPasswordEmitEvent],
    methods: {
        toggleAuth(event) {
            if (event.target.classList.contains("toggleAuth")) {
                this.$emit(toggleAuthEmitEvent);
            }
        },
        changeToRegister() {
            this.$emit(toRegisterEmitEvent);
        },
        changeToForgotPassword() {
            this.$emit(toForgotPasswordEmitEvent);
        }
    },
};
</script>