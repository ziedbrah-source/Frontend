import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredfirstName, setEnteredFirstName] = useState('');
  const [enteredlastName, setEnteredLasttName] = useState('');
  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    firstName: firstNameIsInvalid,
    lastName: lastNameIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'firstName':
        setEnteredFirstName(enteredValue);
        break;
      case 'lastName':
        setEnteredLasttName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      firstName: enteredfirstName,
      lastName: enteredlastName,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, 'firstName')}
            value={enteredfirstName}
            isInvalid={firstNameIsInvalid}
            placeholder="First Name"
          />
        )}
        {!isLogin && (
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, 'lastName')}
            value={enteredlastName}
            isInvalid={lastNameIsInvalid}
            placeholder="Last Name"
          />
        )}
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeholder="Email address"
        />
        {!isLogin && (
          <Input
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            placeholder="Confirm Email Address"
          />
        )}
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          placeholder="Password"
        />
        {!isLogin && (
          <Input
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            placeholder="Confirm Password"
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
