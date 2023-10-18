import React, { createContext, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  const getAccessToken = async () => {
    try {
      const url = "https://localhost:5001/connect/token";
      const body = new URLSearchParams();
      body.append("grant_type", "client_credentials");
      body.append("client_id", "client");
      body.append("client_secret", "secret");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (data && data.access_token) {
        setAccessToken(data.access_token);
      } else {
        throw new Error("No access token in response");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    accessToken,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
