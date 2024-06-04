<template>
    <section class="container auth-section">
        <LoginForm
            @toggle-auth="toggleAuth"
            @to-register="currentSelectedForm = register"
            @to-forgot-password="currentSelectedForm = forgotPassword"
            v-show="currentSelectedForm == login"
        ></LoginForm>
        <RegisterForm
            @toggle-auth="toggleAuth"
            @to-login="currentSelectedForm = login"
            v-show="currentSelectedForm == register"
        ></RegisterForm>
        <ForgotPasswordForm
            @toggle-auth="toggleAuth"
            @to-login="currentSelectedForm = login"
            v-show="currentSelectedForm == forgotPassword"
        ></ForgotPasswordForm>
    </section>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";

// List of forms the auth section will manage.
const loginForm = "login";
const registerForm = "register";
const forgotPasswordForm = "forgot-password";

const toggleAuthEmitEvent = "toggle-auth";
export default {
    components: {
        LoginForm,
        RegisterForm,
        ForgotPasswordForm,
    },
    data() {
        return {
            currentSelectedForm: loginForm,
            login: loginForm,
            register: registerForm,
            forgotPassword: forgotPasswordForm,
        };
    },
    emits: [toggleAuthEmitEvent],
    methods: {
        toggleAuth() {
            this.currentSelectedForm = this.login;
            this.$emit(toggleAuthEmitEvent);
        },
    },
};
</script>

<style scoped>
.auth-section {
    margin-top: 7.2rem;
}
</style>