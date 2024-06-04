const baseUrl = "https://localhost:7106/api";

class Endpoint {
	constructor(path, method) {
		this.path = path;
		this.method = method;
	}
}

// Product Api section.
const productApiUrl = `${baseUrl}/product`;
const productApi = {
	getAll: new Endpoint(productApiUrl + "/all", "get"),
	getById: new Endpoint(productApiUrl + "/all", "get"),
	getByCategoryId: new Endpoint(productApiUrl + "/category", "get"),
};

// Shopping Cart Api section.
const cartApiUrl = `${baseUrl}/cart`;
const shoppingCartApi = {
	get: new Endpoint(cartApiUrl, "get"),
	init: new Endpoint(cartApiUrl + "/init", "post"),
	add: new Endpoint(cartApiUrl + "/add", "post"),
	reduce: new Endpoint(cartApiUrl + "/decrease", "put"),
	remove: new Endpoint(cartApiUrl, "delete")
};

export { Endpoint, productApi, shoppingCartApi };
