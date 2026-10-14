"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthButton({ onCredential, onError, text = "signin_with" }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <p role="status" className="text-center text-sm text-red-500">
        Google sign-in needs NEXT_PUBLIC_GOOGLE_CLIENT_ID configured.
      </p>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) onCredential(response.credential);
            else onError?.("Google did not return an ID token.");
          }}
          onError={() => onError?.("Google sign-in failed. Please try again.")}
          text={text}
          theme="outline"
          shape="rectangular"
          size="large"
          width="320"
        />
      </div>
    </GoogleOAuthProvider>
  );
}
