const baseUrl = "https://ecom.odour.site/api";
// List of HttpMethods.
const HTTP_GET = "get";
const HTTP_POST = "post";
const HTTP_PUT = "put";
const HTTP_DELETE = "delete";

class ApiEndpoint {
	/**
	 * Create a new instance of ApiEndpoint.
	 * @param {String} path The URL path of this ApiEndpoint.
	 * @param {String} method The method to call to this ApiEndpoint.
	 */
	constructor(path, method) {
		this.path = path;
		this.method = method;
	}
}

// Product Api section.
const productApiUrl = `${baseUrl}/product`;
const productApi = {
	getAll: new ApiEndpoint(productApiUrl + "/all", HTTP_GET),
	getById: new ApiEndpoint(productApiUrl, HTTP_GET),
	getByCategoryId: new ApiEndpoint(productApiUrl + "/category", HTTP_GET)
};

// Shopping Cart Api section.
const cartApiUrl = `${baseUrl}/cart`;
const shoppingCartApi = {
	get: new ApiEndpoint(cartApiUrl, HTTP_GET),
	init: new ApiEndpoint(cartApiUrl + "/init", HTTP_POST),
	add: new ApiEndpoint(cartApiUrl + "/add", HTTP_POST),
	reduce: new ApiEndpoint(cartApiUrl + "/decrease", HTTP_PUT),
	remove: new ApiEndpoint(cartApiUrl, HTTP_DELETE)
};

const orderApiUrl = `${baseUrl}/order`;
const orderApi = {
	checkout: new ApiEndpoint(orderApiUrl, HTTP_POST),
	cancel: new ApiEndpoint(orderApiUrl + "/cancel", HTTP_POST),
	confirm: new ApiEndpoint(orderApiUrl + "/confirm", HTTP_POST),
	getAllForUser: new ApiEndpoint(orderApiUrl + "/user", HTTP_GET),
	getAllForGuest: new ApiEndpoint(orderApiUrl + "/guest", HTTP_GET),
	getByIdForDetailDisplay: new ApiEndpoint(orderApiUrl, HTTP_GET)
};

const authApiUrl = `${baseUrl}/auth/user`;
const authApi = {
	login: new ApiEndpoint(authApiUrl + "/login", HTTP_POST),
	logout: new ApiEndpoint(authApiUrl + "/logout", HTTP_POST),
	verify: new ApiEndpoint(authApiUrl + "/verify", HTTP_POST),
	register: new ApiEndpoint(authApiUrl + "/register", HTTP_POST),
	registerConfirm: new ApiEndpoint(authApiUrl + "/register/confirm", HTTP_GET),
	forgotPassword: new ApiEndpoint(authApiUrl + "/forgot-password", HTTP_POST),
};

const userProfileApiUrl = `${baseUrl}/user`;
const userProfileApi = {
	getProfile: new ApiEndpoint(userProfileApiUrl + "/profile", HTTP_GET)
};

const caloriesApiUrl = `${baseUrl}/calories`;
const caloriesApi = {
	calculate: new ApiEndpoint(caloriesApiUrl, HTTP_POST)
};

export {
	ApiEndpoint,
	productApi,
	shoppingCartApi,
	orderApi,
	authApi,
	userProfileApi,
	caloriesApi
};
