import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { createUser } from '../util/auth';

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, firstName, lastName }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password, firstName, lastName);
      if (response.id) {
        Alert.alert(
          'Registration',
          'Your Registration has been done successfully',
          [
            {
              text: 'Login In Now',
              onPress: () => navigation.navigate('Login'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
        setIsAuthenticating(false);
      }
      // authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView>
        <AuthContent onAuthenticate={signupHandler}></AuthContent>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});

export default SignupScreen;
