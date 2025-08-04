import React, { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    const clientId = "appA";
    const redirectUri = `${window.location.origin}/callback`;

    window.open(
      `https://sso-popup-client.vercel.app/?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`,
      "SSO_Popup",
      "width=500,height=600"
    );
  };

  useEffect(() => {
    const handleMessage = async (event) => {
      // Ensure it's from trusted origin
      const allowedOrigins = [
        "https://sso-popup-client.vercel.app",
        "https://ssoserver-production.up.railway.app"
      ];
      if (!allowedOrigins.includes(event.origin)) return;

      const { token } = event.data;
      if (token) {
        setToken(token);
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserInfo(payload);
        } catch (err) {
          console.error("Invalid token received", err);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome to App A</h1>
      <button onClick={handleLogin}>Login with SSOWebsite</button>

      {userInfo && (
        <div style={{ marginTop: '30px' }}>
          <h3>User Info from Token:</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
