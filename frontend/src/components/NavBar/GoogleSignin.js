// import { useGoogleLogin } from 'react-google-login';
import React from 'react';
import * as jose from 'jose'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { register, signIn } from '../../service';

function GoogleSignIn () {
  const clientId = '269678883797-fgtridg8gh9u4p3574lbu2nefdtor722.apps.googleusercontent.com'
  const onSuccess = async (credentialResponse) => {
    // console.log('Login Success', credentialResponse);
    const token = credentialResponse.credential
    const claims = jose.decodeJwt(token)
    const firstName = claims.given_name
    const email = claims.email
    const password = claims.aud
    // console.log('password', password)
    // console.log(claims)
    try {
      await register({ name: firstName, email, password });
    } catch (error) {}
    const response = await signIn({ email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      window.location.reload(false)
    }
    console.log('token', token)
  };
  const onFailure = (res) => {
    console.log('Login Failed  res', res);
  };
  return (
    <div style={{ display: 'flex', margin: 0, marginLeft: '30%', marginBottom: '5%' }}>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        />
    </GoogleOAuthProvider>
    </div>
  );
}
export default GoogleSignIn;
