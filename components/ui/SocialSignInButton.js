import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <Button onPress={onSignInFacebook} bgColor="#E7EAF4" fgColor="#4765A9">
        Sign In with Facebook"
      </Button>
      <Button onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44">
        "Sign In with Google"
      </Button>
      <Button onPress={onSignInApple} bgColor="#e3e3e3" fgColor="#363636">
        "Sign In with Apple"
      </Button>
    </>
  );
};

export default SocialSignInButtons;
