class CartItem {
	/**
	 * The constructor to create a new CartItem instance.
	 * @param {String} productId Id of the product belong to this cart item.
	 * @param {String} productName Name of the product belong to this cart item.
	 * @param {Number} unitPrice Unit price of the product belong to this cart item.
	 * @param {String} imageUrl The image of the product belong to this cart item.
	 * @param {Number} quantity The current quantity of this product in the shopping cart.
	 */
	constructor(productId, productName, unitPrice, imageUrl, quantity) {
		this.productId = productId;
		this.productName = productName;
		this.unitPrice = unitPrice;
		this.imageUrl = imageUrl;
		this.quantity = quantity;
	}

	/**
	 * Calculate the subtotal=(quantity * unitPrice)
	 * of this cart item and return the result.
	 * @returns {Number} The sub total of this cartItem.
	 */
	getSubTotal() {
		return this.quantity * this.unitPrice;
	}
}

class CallBack {
	constructor(callbackId, callback) {
		this.callbackId = callbackId;
		this.callback = callback;
	}
}

// Đã thử và thành công khi nó có thể gọi callback được.
// Bây giờ thì bổ sung thêm lớp Callback gồm CallbackId và callback() để dễ xử lý hơn
// Cái này sẽ như là 1 state dùng chung giữa các components đối vs shopping cart.

class ShoppingCartManager {
	/**
	 * @param {CartItem[]} cartItems List of cart items this shopping cart is managed.
	 * @param {CallBack[]} addToCartCallbacks List of callback will be called whenever the
	 * add-to-cart method is invoked on this AppShoppingCart instance.
	 * @param {Number} totalPrice Total price of this shopping cart.
	 * @param {Number} itemCount Total numbers of item in this shopping cart.
	 */
	constructor(cartItems, addToCartCallbacks, totalPrice, itemCount) {
		this.cartItems = cartItems;
		this.addToCartCallbacks = addToCartCallbacks;
		if (totalPrice == null || totalPrice == undefined) {
			this.totalPrice = 0;
		} else {
			this.totalPrice = totalPrice;
		}

		this.itemCount = itemCount;
	}

	/**
	 * Get the total number of the cartItem
	 * of this shopping cart and return.
	 * @returns {Number} The number of cartItem in this shopping cart.
	 */
	getItemCount() {
		return this.itemCount;
	}

	/**
	 * Add cartItem into this shopping cart. If the input
	 * cartItem's productId is existed in this shopping cart, then
	 * increase the quantity of the corresponding item in the cart.
	 * @param {CartItem} cartItem The productItem that added to this shopping cart instance.
	 */
	addItem(cartItem) {
		const foundItem = this.cartItems.find(
			(item) => item.productId == cartItem.productId
		);

		if (foundItem) {
			foundItem.quantity += cartItem.quantity;
		} else {
			this.cartItems.push(cartItem);
		}

		// Update subTotal price of the input
		// cartItem to totalPrice of this cart.
		this.totalPrice += cartItem.quantity * cartItem.unitPrice;
		this.itemCount += cartItem.quantity;
	}

	/**
	 * Remove the cartItem that have productId equal to the input productId.
	 * @param {String} productId Id of the productItem to remove.
	 */
	removeItem(productId) {
		for (let i = 0; i < this.cartItems.length; i++) {
			const foundItem = this.cartItems[i];

			if (foundItem.productId == productId) {
				this.cartItems.splice(i, 1);
				this.totalPrice -= foundItem.getSubTotal();
				this.itemCount -= foundItem.quantity;

				return;
			}
		}
	}

	/**
	 * Update the quantity of the specified cartItem with the input productId.
	 * @param {String} productId Id of the product item of this shopping cart.
	 * @param {Int} quantity The quantity to update.
	 */
	updateItemQuantity(productId, quantity) {
		let foundIndex = -1;
		const foundItem = this.cartItems.find((item, index) => {
			foundIndex = index;
			return item.productId == productId;
		});

		if (foundItem) {
			foundItem.quantity += quantity;

			// If the quantity is less than 0, then remove from the cartItem list.
			if (foundItem.quantity <= 0) {
				this.cartItems.splice(foundIndex, 1);
			}

			// Update the subTotal price of the input
			// cartItem to totalPrice of this cart.
			this.totalPrice += quantity * foundItem.unitPrice;
			this.itemCount += quantity;
		}
	}

	/**
	 * Update the ShoppingCartUI for the user by calling the callbacks.
	 */
	updateCart() {
		// Call the callbacks to update the shopping cart on the page.
		for (const callbackItem of this.addToCartCallbacks) {
			callbackItem.callback();
		}
	}

	getCartItemByProductId(productId) {
		const findItem = this.cartItems.find(
			(item) => item.productId == productId
		);

		if (findItem) {
			return findItem;
		}

		return null;
	}

	/**
	 * Add current item's callback into this shoppingCart state management.
	 * This callback will be later invoked when any change is detected.
	 * @param {String} id Id of the callback.
	 * @param {CallBack} callback The callback that added.
	 */
	addCallback(id, callback) {
		const findCallback = this.addToCartCallbacks.find(
			(item) => item.callbackId == id
		);

		if (findCallback) {
			findCallback.callback = callback;
			return;
		}

		const callbackItem = new CallBack(id, callback);
		this.addToCartCallbacks.push(callbackItem);
	}

	/**
	 * Remove the callback item from callback list of the shopping cart manager.
	 * @param {String} callbackId Id of the callback that needed to be removed
	 * from callback list of the shopping cart manager.
	 */
	removeCallbackById(callbackId) {
		for (let index = 0; index < this.addToCartCallbacks.length; index++) {
			const foundCallback = this.addToCartCallbacks[index];

			if (foundCallback.callbackId == callbackId) {
				this.addToCartCallbacks.splice(index, 1);
				break;
			}
		}
	}
}

const shoppingCart = new ShoppingCartManager([], [], 0, 0);
export { CartItem, ShoppingCartManager, shoppingCart };
