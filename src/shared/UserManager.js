import axios from "axios";
import { authApi } from "./ApiUrls";
import CookieHelper from "./helpers/CookieHelper";
import { AccessTokenCookieName, RefreshTokenCookieName } from "./AppConstants";

class AppUser {
	/**
	 * Constructor to create new AppUser instance.
	 * @param {String} fullName FullName of this signed-in user.
	 * @param {String} avatarUrl AvatarUrl of this signed-in user.
	 * @param {String} accessToken AccessToken of this signed-in user.
	 * @param {String} refreshToken RefreshToken of this signed-in user.
	 * @param {Boolean} isAuthenticated Specify this user is authenticated or not.
	 */
	constructor(
		fullName,
		avatarUrl,
		accessToken,
		refreshToken,
		isAuthenticated
	) {
		this.fullName = fullName;
		this.avatarUrl = avatarUrl;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.isAuthenticated = isAuthenticated ? isAuthenticated : false;
	}

	/**
	 * Check if this user has access token to access the authorized pages.
	 * @returns {Boolean}
	 */
	hasAccessToken() {
		return this.accessToken != null;
	}
}

class CallBack {
	constructor(callbackId, callback) {
		this.callbackId = callbackId;
		this.callback = callback;
	}
}

class UserManager {
	/**
	 *
	 * @param {AppUser} managedUser Signed in user that is managed by this app.
	 * @param {CallBack[]} loginCallbacks The callback list that will be called when user login successfully.
	 */
	constructor(managedUser, loginCallbacks) {
		this.managedUser = managedUser;
		this.loginCallbacks = loginCallbacks;
	}

	getTokenFromCookie() {
		// Get access token from cookie.
		const accessTokenCookie = CookieHelper.getCookieByName(
			AccessTokenCookieName
		);

		if (accessTokenCookie.isExisted) {
			this.managedUser.accessToken = accessTokenCookie.value;
		}

		// Get refresh token from cookie.
		const refreshTokenCookie = CookieHelper.getCookieByName(
			RefreshTokenCookieName
		);

		if (refreshTokenCookie.isExisted) {
			this.managedUser.refreshToken = refreshTokenCookie.value;
		}
	}

	addLoginCallbacks(id, callback) {
		const findCallback = this.loginCallbacks.find(
			(item) => item.callbackId == id
		);

		if (findCallback) {
			findCallback.callback = callback;
			return;
		}

		const loginCallback = new CallBack(id, callback);
		this.loginCallbacks.push(loginCallback);
	}

	verifyAuthentication() {
		if (
			this.managedUser.accessToken == null
			|| this.managedUser.refreshToken == null
		) {
			return new Promise(() => {});
		}

		return axios({
			url: authApi.verify.path,
			method: authApi.verify.method,
			headers: {
				Authorization: `Bearer ${this.managedUser.accessToken}`
			}
		})
		.then((response) => {
			const userCredentials = response.data.body;

			this.managedUser.isAuthenticated = true;
			this.managedUser.avatarUrl = userCredentials.avatarUrl;
			this.managedUser.fullName = userCredentials.fullName;
		})
		.catch(() => {
			this.managedUser.isAuthenticated = false;
		});
	}

	/**
	 * This method will invoke all login callbacks
	 * that managed by this UserManager to update the UI.
	 */
	login() {
		for (const callbackItem of this.loginCallbacks) {
			callbackItem.callback();
		}
	}

	logout() {
		// Remove all cookies contains token.
		CookieHelper.removeCookie(AccessTokenCookieName);
		CookieHelper.removeCookie(RefreshTokenCookieName);

		this.managedUser.accessToken = null;
		this.managedUser.refreshToken = null;
		this.managedUser.isAuthenticated = false;
		this.managedUser.avatarUrl = null;
		this.managedUser.fullName = null;
	}
}

const user = new AppUser(null, null, null, null);
const userManager = new UserManager(user, [], []);

export default userManager;
