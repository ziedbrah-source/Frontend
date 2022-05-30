import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const NotificationsScreen = () => {
  return (
    <SafeAreaView>
      <Header message="Your notifications :"></Header>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
