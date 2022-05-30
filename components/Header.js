import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Header = ({ message }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
        {message}
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ImageBackground
          source={require('../assets/images/user-profile.jpg')}
          style={{ width: 50, height: 50 }}
          imageStyle={{ borderRadius: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
