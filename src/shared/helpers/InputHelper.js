const minPhoneNumberLength = 10;
const maxPhoneNumberLength = 11;
const emailRegExp =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-zA-Z]{2,3}|com|vn|net)\b/;

const InputTypes = {
	phoneNumber: "tel",
	email: "email",
	password: "password",
	default: "text"
};

class InputHelper {
	static IsNullOrEmpty(value) {
		return value == null || String(value).length == 0;
	}

	/**
	 * Check if the input phone number is valid or not.
	 * @param {String} phoneNumber The phone number to check.
	 * @returns {Boolean}
	 */
	static IsValidPhoneNumber(phoneNumber) {
		// If input is null, return false.
		if (this.IsNullOrEmpty(phoneNumber)) {
			return false;
		}

		// Return false if the length of the phone number is not valid.
		if (
			phoneNumber.length < minPhoneNumberLength ||
			phoneNumber.length > maxPhoneNumberLength
		) {
			return false;
		}

		// Return false if the first number is not 0.
		if (phoneNumber[0] != "0") {
			return false;
		}

		for (let i = 1; i < phoneNumber.length; i++) {
			const numberChar = phoneNumber.charAt(i);

			if (numberChar < "0" || numberChar > "9") {
				return false;
			}
		}

		return true;
	}

	/**
	 * Check if the input email is valid or not.
	 * @param {String} email The email address to check.
	 * @returns {Boolean}
	 */
	static IsValidEmail(email) {
		if (this.IsNullOrEmpty(email)) {
			return false;
		}

		const result = String(email).match(emailRegExp) != null;

		return result;
	}

	/**
	 * Check if the input value is valid or not by the specified input type.
	 * The input type include: email, phone, password, text.
	 * @summary If no input type is specified, default will be text.
	 * @param {String} inputValue
	 * @param {String} inputType
	 */
	static IsValidByInputType(inputValue, inputType) {
		if (inputType == null || inputType == InputTypes.default) {
			return !this.IsNullOrEmpty(inputValue);
		}

		if (inputType == InputTypes.phoneNumber) {
			return this.IsValidPhoneNumber(inputValue);
		}

		if (inputType == InputTypes.email) {
			return this.IsValidEmail(inputValue);
		}
	}
}

export default InputHelper;
export { InputTypes };
