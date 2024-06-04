const numberFormat = new Intl.NumberFormat("en-US");

class MoneyHelper {
	/**
	 *
	 * @param {integer} money
	 * @returns {string} A formatted string that represented
	 * the money value in Vietnamese format.
	 */
	format(money) {
		return numberFormat.format(money);
	}
}

const moneyHelper = new MoneyHelper();
export default moneyHelper;
