<template>
    <div class="d-flex">
        <label for="password">
            Mật khẩu<span class="text-danger">*</span>
        </label>
        <small v-if="forLoginPurpose"
            @click="changeToForgotPassword"
            class="p-0 btn btn-link text-primary ms-auto fw-bold"
        >
            Quên mật khẩu?
        </small>
    </div>
    <div class="input-group mb-3">
        <input
            @input="updateInput"
            v-model="inputValueRef"
            :type="inputType"
            :class="invalidClassList"
            class="form-control"
            placeholder="Nhập mật khẩu của bạn"
            id="password"
        />
        <span
            class="input-group-text"
            @click="togglePassword">
            <img
                v-if="!showPassword"
                class="password-icon"
                src="../../../assets/icons/closed_eye.png"
            />
            <img
                v-if="showPassword"
                class="password-icon"
                src="../../../assets/icons/eye.png"
            />
        </span>
    </div>
</template>

<script>
const changeToForgotPasswordEmitEvent = "change-to-forgot";
const inputUpdateEmitEvent = "input-update";
const validateInputEmitEvent = "validate-input";

const invalidStatusClassList = "border-danger border-2";

export default {
    emits: [changeToForgotPasswordEmitEvent, inputUpdateEmitEvent],
    props: {
        inputValue: String,
        forLoginPurpose: Boolean,
    },
    data() {
        return {
            isInvalid: false,
            showPassword: false,
            inputType: "password",
            inputValueRef: this.inputValue,
            invalidClassList: null,
        };
    },
    mounted() {
        // Pass the validateInputValue() method as a callback to
        // the parent component for later form submission validation.
        this.$emit(validateInputEmitEvent, this.validateInputValue);
    },
    methods: {
        validateInputValue() {
            const isInvalid =
                this.inputValueRef == null || this.inputValueRef.length == 0;

            this.setInvalidClassList(isInvalid);

            return !isInvalid;
        },
        updateInput() {
            const isInvalid =
                this.inputValueRef == null || this.inputValueRef.length == 0;

            this.setInvalidClassList(isInvalid);
            this.$emit(inputUpdateEmitEvent, this.inputValueRef);
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
            this.inputType = this.showPassword ? "text" : "password";
        },
        changeToForgotPassword() {
            this.$emit(changeToForgotPasswordEmitEvent);
        },
        setInvalidClassList(isInvalid) {
            if (isInvalid) {
                this.isInvalid = true;
                this.invalidClassList = invalidStatusClassList;
            } else {
                this.isInvalid = false;
                this.invalidClassList = null;
            }
        },
    },
};
</script>

<style scoped>
.password-icon {
    --size: 20px;
    height: var(--size);
    width: var(--size);
}
</style>