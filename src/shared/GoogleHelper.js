// Configuration section.
const CLIENT_LIBRARY_URL = "https://accounts.google.com/gsi/client";
const SCOPES = "email profile openid";
const CLIENT_LIBRARY_ID = "gsi_client";
const CLIENT_ID =
	"963805149694-qtihuc1jiksu4uf14e488odi1dh6fqba.apps.googleusercontent.com";

/**
 * Represent the data contains from the response of google consent.
 * @note This class is only used for marker purpose.
 */
class GoogleConsentResponse {
    constructor(state, access_token, authuser, expires_in, prompt, scope, token_type) {
        this.state = state;
        this.access_token = access_token;
        this.authuser = authuser;
        this.expires_in = expires_in;
        this.prompt = prompt;
        this.scope = scope;
        this.token_type = token_type;
    }
}

const GoogleHelper = {
	clientLibraryState: {
		loadSuccess: false
	},
	/**
	 * Loading the Google client library for processing google auth.
	 * @param {Callback} loadSuccessCallback The callback that will be invoked when the
	 * client library script is loading success.
	 */
	loadClientLibrary(loadSuccessCallback) {
		// Check if the client library is load success.
		if (this.clientLibraryState.loadSuccess) {
			return;
		}

		const script = document.createElement("script");

		// Init the script's attributes.
		script.id = CLIENT_LIBRARY_ID;
		script.src = CLIENT_LIBRARY_URL;
		script.defer = true;
		script.async = true;

		// Add load event listener to script.
		script.addEventListener("load", () => {
			this.clientLibraryState = true;

			if (loadSuccessCallback) {
				loadSuccessCallback();
			}
		});

		// Add script to document head.
		document.head.appendChild(script);
	}
};

export { CLIENT_ID, SCOPES, GoogleHelper, GoogleConsentResponse };
