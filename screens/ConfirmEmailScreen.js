import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Input from '../components/Auth/Input';
import Button from '../components/ui/Button';

const ConfirmEmailScreen = ({ navigation, route }) => {
  // const route = useRoute();

  // const user = route?.params?.username;

  const onConfirmPressed = async (data) => {
    // try {
    //
    //   //navigation.navigate('Login');
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
  };

  const onSignInPress = () => {
    navigation.navigate('Login');
  };

  const onResendPress = async () => {
    try {
      //await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <View style={{ width: '80%' }}>
        <Input placeholder="Username" />

        <Input placeholder="Enter your confirmation code" />
      </View>

      <Button onPress={onConfirmPressed}>Confirm</Button>

      <Button onPress={onResendPress} type="SECONDARY">
        Resend code
      </Button>

      <Button onPress={onSignInPress} type="TERTIARY">
        Back to Sign in
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#F9FBFC',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    margin: 10,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
});

export default ConfirmEmailScreen;
