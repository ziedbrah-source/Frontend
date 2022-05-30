import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
const DEFAULT_IMAGE =
  'https://m.media-amazon.com/images/I/61ZZMqjlfSL._AC_SX466_.jpg';
const NotificationItem = ({ notification }) => {
  const onPress = () => {
    navigation.navigate('Notification', { id: notification.id });
  };
  console.log(notification);
  return (
    <Pressable onPress={onPress} style={styles.cameraContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={{
            uri: DEFAULT_IMAGE,
          }}
          style={styles.image}
        />
        <View style={styles.row}>
          <Text style={styles.title}>
            Your Notification ID: {notification.id}
          </Text>
          <Text style={styles.subtitle}>
            Notification created At :
            {new Date(notification.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            Longitude: {parseFloat(notification.longitude).toFixed(2)}
          </Text>
          <Text style={styles.title}>
            Latitude: {parseFloat(notification.latitude).toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  cameraContainer: {
    width: '100%',
    marginVertical: 10,
    //margin: 0,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
  },
  subtitle: {
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
