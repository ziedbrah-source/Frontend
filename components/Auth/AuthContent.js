import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';
import Button from '../ui/Button';
import SocialSignInButtons from '../ui/SocialSignInButton';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let {
      email,
      confirmEmail,
      password,
      confirmPassword,
      firstName,
      lastName,
    } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    const firstNameIsValid = firstName.length > 4;
    const lastNameIsValid = lastName.length > 4;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        firstName: !firstNameIsValid,
        lastName: !lastNameIsValid,
      });
      return;
    }
    const requestObject = {
      email: email,
      password: password,
      ...(!isLogin && { firstName, lastName }),
    };
    onAuthenticate(requestObject);
  }

  return (
    <View style={styles.authContent}>
      <Image
        style={[styles.logo, styles.root, { height: height * 0.3 }]}
        resizeMode="contain"
        source={require('../../assets/images/logo.png')}
      ></Image>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button type="TERTIARY" onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
      <SocialSignInButtons></SocialSignInButtons>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F9FBFC',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  root: {
    alignItems: 'center',
    marginLeft: 10,
    width: '100%',
  },
});
