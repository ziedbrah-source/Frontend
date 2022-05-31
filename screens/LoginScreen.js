import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login, PostExpoToken } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    // console.log(email);
    // console.log(password);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      //console.log(authCtx.deviceToken);
      const response = await PostExpoToken(authCtx.deviceToken, token);
      //console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication failed!',
        error,
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ScrollView>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </ScrollView>
  );
}

export default LoginScreen;
