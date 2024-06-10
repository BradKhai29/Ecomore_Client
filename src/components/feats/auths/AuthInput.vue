<template>
    <div :class="extraClassList" class="form-group flex-fill mb-2">
        <label :for="inputId">
            {{ inputLabel }}<span v-if="isRequired" class="text-danger">*</span>
            <small v-if="isInvalid && displayError" class="ms-1">
                (<small class="text-danger">{{ inputErrorMessageRef }}</small
                >)
            </small>
        </label>
        <input
            @input="updateInput"
            v-model="inputValueRef"
            :type="inputType"
            :class="invalidClassList"
            class="mt-1 form-control"
            :id="inputId"
            :placeholder="placeholder"
            :required="isRequired"
        />
    </div>
</template>

<script>
import InputHelper from "../../../shared/helpers/InputHelper";

const inputUpdateEmitEvent = "input-update";
const validateInputEmitEvent = "validate-input";
const invalidStatusClassList = "border-danger border-2";

export default {
    emits: [inputUpdateEmitEvent, validateInputEmitEvent],
    props: {
        inputId: String,
        inputType: String,
        inputLabel: String,
        inputErrorMessage: String,
        placeholder: String,
        isRequired: Boolean,
        inputValue: String,
        extraClassList: String,
        displayErrorMessage: Boolean,
    },
    mounted() {
        // Pass the validateInputValue() method as a callback to
        // the parent component for later form submission validation.
        this.$emit(validateInputEmitEvent, this.validateInputValue);
    },
    data() {
        return {
            inputValueRef: this.inputValue,
            isInvalid: false,
            invalidClassList: null,
        };
    },
    computed: {
        inputErrorMessageRef() {
            if (this.inputErrorMessage) {
                return this.inputErrorMessage;
            }

            return "Vui lòng không để trống";
        },
        displayError() {
            if (this.displayErrorMessage == null) {
                return true;
            }

            return this.displayErrorMessage;
        }
    },
    methods: {
        validateInputValue() {
            // If this input is required, then not allow null.
            if (
                this.isRequired &&
                InputHelper.IsNullOrEmpty(this.inputValueRef)
            ) {
                this.setInvalidClassList(false);
                return false;
            }

            const isValid = this.isRequired && InputHelper.IsValidByInputType(
                this.inputValueRef,
                this.inputType
            );

            this.setInvalidClassList(isValid);

            return isValid;
        },
        updateInput() {
            const isValid = InputHelper.IsValidByInputType(
                this.inputValueRef,
                this.inputType
            );

            this.setInvalidClassList(isValid);
            this.$emit(inputUpdateEmitEvent, this.inputValueRef);
        },
        setInvalidClassList(isValid) {
            if (!isValid) {
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