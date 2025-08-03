import React, { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    window.open(
      `https://ssowebsite-popup.vercel.app/?client_id=appA&redirect_uri=${window.location.origin}`,
      "SSO_Popup",
      "width=500,height=600"
    );
  };

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (
        event.origin === "https://ssowebsite-popup.vercel.app" ||
        event.origin.includes("railway.app")
      ) {
        const { token } = event.data;
        setToken(token);

        // Call backend or decode token (for demo decode here)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserInfo(payload);
      }
    });
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
