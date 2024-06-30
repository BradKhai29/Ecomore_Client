<template>
    <button
        v-if="showButton"
        @click="loginWithGoogle"
        type="button"
        :disabled="isProcessing"
        class="rounded d-flex flex-fill align-items-center justify-content-center btn py-2"
    >
        <span v-if="!isProcessing">
            <img src="@/assets/svgs/google.svg" />
            <span class="ms-3">Đăng nhập với Google</span>
        </span>
        <span v-if="isProcessing" class="d-flex justify-content-center">
            <LoadingIcon/> <span class="ms-3">Đang xử lý</span>
        </span>
    </button>
</template>

<script>
import {
    GoogleHelper,
    CLIENT_ID,
    SCOPES,
    GoogleConsentResponse,
} from "@/shared/GoogleHelper";

import { googleAuthApi } from "@/shared/ApiUrls";
import axios from "axios";
import CookieHelper from "@/shared/helpers/CookieHelper";
import {
    AccessTokenCookieName,
    RefreshTokenCookieName,
} from "@/shared/AppConstants";
import userManager from "@/shared/UserManager";

// Import components.
import LoadingIcon from "@/components/shared/LoadingIcon.vue";

export default {
    components: {
        LoadingIcon,
    },
    data() {
        return {
            showButton: false,
            securityState: null,
            google: null,
            isProcessing: false,
        };
    },
    mounted() {
        GoogleHelper.loadClientLibrary(() => {
            this.google = window.google;
            this.showButton = true;

            axios({
                url: googleAuthApi.initSecurityState.path,
                method: googleAuthApi.initSecurityState.method,
            })
            .then((response) => {
                this.securityState = response.data.body.securityState;
            })
            .catch((err) => {
                console.log(err);
            });
        });
    },
    methods: {
        ignore() {

        },
        loginWithGoogle() {
            if (this.isProcessing) {
                return;
            }

            const tokenClient = this.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                state: this.securityState,
                callback: this.resolveLoginWithGoogle,
            });

            tokenClient.requestAccessToken();
        },
        /**
         * Resolve the response from the google after user accept the consent screen.
         * @param {GoogleConsentResponse} response The response that received from google after
         * user accept the consent screen.
         */
        resolveLoginWithGoogle(response) {
            this.ignore(GoogleConsentResponse);
            this.isProcessing = true;

            axios({
                url: googleAuthApi.login.path,
                method: googleAuthApi.login.method,
                data: {
                    state: response.state,
                    accessToken: response.access_token,
                },
            })
            .then((response) => {
                const body = response.data.body;

                const accessToken = body.accessToken;
                const refreshToken = body.refreshToken;

                CookieHelper.setCookie(
                    AccessTokenCookieName,
                    accessToken,
                    7
                );
                CookieHelper.setCookie(
                    RefreshTokenCookieName,
                    refreshToken,
                    7
                );

                // Get token stored from the cookies and manage.
                userManager.getTokenFromCookie();

                this.isProcessing = false;

                userManager.verifyAuthentication().then(() => {
                    if (userManager.managedUser.isAuthenticated) {
                        userManager.login();
                        this.$router.push("/");
                    }
                });
            })
            .catch((err) => {
                this.isProcessing = false;
                console.log(err);
            });
        },
    },
};
</script>