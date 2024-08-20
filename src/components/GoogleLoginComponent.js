import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginComponent = ({ onSuccess }) => {
  return (
    <GoogleOAuthProvider clientId="329524873801-rm32c70npcmolb5c8j9diacs65fohlle.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const user = jwtDecode(credentialResponse.credential);
          onSuccess(user);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
