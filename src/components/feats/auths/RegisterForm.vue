<template>
    <div
        @click="toggleAuth"
        class="row align-items-center justify-content-center toggleAuth"
    >
        <!-- Register Start -->
        <section v-if="!showSuccessPopup" class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
            <div class="form-block mx-auto">
                <div class="d-flex align-items-center mb-5">
                    <h4 class="m-0">
                        Đăng ký
                        <span class="text-primary">Ecomorɘ</span>
                    </h4>
                    <img
                        class="toggleAuth ms-auto btn btn-white"
                        src="../../../assets/icons/cross_icon.png"
                    />
                </div>
                <form @submit.prevent="" class="text-start d-flex flex-column">
                    <section class="d-flex">
                        <section class="form-group me-1 mb-3">
                            <label for="firstName"
                                >Họ<span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="firstName"
                            />
                        </section>
                        <section class="form-group ms-1 mb-3">
                            <label for="lastName">
                                Tên<span class="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="lastName"
                            />
                        </section>
                    </section>
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
                        <a @click="changeToLogin" href="#" class="text-primary fw-bold"
                            >Đăng nhập ngay</a
                        >
                    </div>
                </form>
            </div>
        </section>
        <!-- Register End -->

        <!-- Popup Register Success Start -->
        <section v-if="showSuccessPopup" class="col-md-4 register rounded py-3 bg-white">
            <div class="form-block">
                <div class="text-center">
                    <h3 class="bg-primary py-4 rounded">
                        <img src="../../../assets/icons/mail.png" alt="" srcset="" />
                    </h3>
                </div>

                <footer class="d-flex flex-column">
                    <p class="fw-bold my-3">
                        Vui lòng kiểm tra mail để hoàn tất đăng ký
                    </p>
                    <section class="d-flex mb-4 register rounded">
                        <div
                            href="#"
                            class="d-flex flex-fill align-items-center btn py-2"
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
const toggleAuthEmitEvent = "toggle-auth";
const toLoginEmitEvent = "to-login";

export default {
    emits: [toggleAuthEmitEvent, toLoginEmitEvent],
    data() {
        return {
            showSuccessPopup: false,
        };
    },
    methods: {
        toggleAuth(event) {
            if (event.target.classList.contains("toggleAuth")) {
                this.$emit(toggleAuthEmitEvent);
            }
        },
        changeToLogin() {
            this.$emit(toLoginEmitEvent);
        },
    },
};
</script>