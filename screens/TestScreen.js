import { StyleSheet, Text, View } from 'react-native';
import { React, useEffect } from 'react';
import axios from 'axios';
const TestScreen = () => {
  useEffect(() => {
    // async function logIn(email, password) {
    //   const url = 'http://localhost:5500/auth/login/';
    //   const response = await axios.post(url, {
    //     email: email,
    //     password: password,
    //   });

    //   console.log(response.data);
    //   const token = response.data.access_token;

    //   return token;
    // }
    async function test() {
      try {
        const rawResponse = await fetch('http://192.168.0.3:5500/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'zied@zied.com',
            password: '12345678',
          }),
        });

        const content = await rawResponse.json();
        return content.access_token;
      } catch (err) {
        console.log(err);
      }
    }
    const token = test();
    console.log(token);
  }, []);
  return (
    <View>
      <Text>testScreen</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
