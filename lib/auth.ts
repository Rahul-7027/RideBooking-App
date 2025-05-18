import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

/**
 * Custom token cache for Clerk using SecureStore.
 */
export const tokenCache = {
    async getToken(key: string): Promise<string | null> {
        try {
            const item = await SecureStore.getItemAsync(key);
            if (item) {
                console.log(`Token retrieved for key: ${key} 🔐`);
            } else {
                console.log(`No token stored under key: ${key}`);
            }
            return item;
        } catch (error) {
            console.error(`Error retrieving token for key: ${key}`, error);
            await SecureStore.deleteItemAsync(key); // Clear potentially corrupted token
            return null;
        }
    },

    async saveToken(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
            console.log(`Token saved under key: ${key} ✅`);
        } catch (err) {
            console.error(`Error saving token under key: ${key}`, err);
        }
    },
};

/**
 * Starts Google OAuth flow using Clerk and sets active session.
 * Customize redirectUrl based on your routing structure.
 */
export const googleOAuth = async (startOAuthFlow: any) => {
    try {
        const { createdSessionId, setActive, signUp } = await startOAuthFlow({
            redirectUrl: Linking.createURL("../app/(root)/(tabs)/home.tsx"),
        });

        if (createdSessionId && setActive) {
            await setActive({ session: createdSessionId });

            // Optional: Create user in your backend
            /*
            if (signUp?.createdUserId) {
              await fetchAPI("/(api)/user", {
                method: "POST",
                body: JSON.stringify({
                  name: `${signUp.firstName} ${signUp.lastName}`,
                  email: signUp.emailAddress,
                  clerkId: signUp.createdUserId,
                }),
              });
            }
            */

            return {
                success: true,
                code: "success",
                message: "You have successfully signed in with Google",
            };
        }

        return {
            success: false,
            code: "no_session",
            message: "No session was created during the Google sign-in",
        };
    } catch (err: any) {
        console.error("Google OAuth error:", err);
        return {
            success: false,
            code: err?.code || "unknown_error",
            message: err?.errors?.[0]?.longMessage || "An unexpected error occurred",
        };
    }
};
