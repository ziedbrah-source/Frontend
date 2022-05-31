import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotificationItem from '../components/NotificationItem';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState, useContext } from 'react';
import { getNotificationById } from '../util/notifications';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Foundation } from '@expo/vector-icons';

const NotificationDetails = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const token = useContext(AuthContext).token;

  const id = route.params?.id;
  useEffect(async () => {
    async function getNotifById(token, id) {
      return await getNotificationById(token, id);
    }
    const data = await getNotifById(token, id);
    setNotification(data);
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingOverlay message="Loading the notification"></LoadingOverlay>;
  }
  return (
    <View style={{ margin: 10, position: 'relative' }}>
      <View style={{ height: '50%' }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: parseFloat(notification.latitude),
            longitude: parseFloat(notification.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(notification.latitude),
              longitude: parseFloat(notification.longitude),
            }}
            title="Notification"
            identifier="Driver not concentrated"
          >
            <Foundation name="alert" size={40} color="red" />
          </Marker>
        </MapView>
      </View>
      <View style={{ height: '50%' }}>
        <NotificationItem
          style={styles.notif}
          withOutImage
          notification={notification}
        ></NotificationItem>
      </View>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  map: { position: 'relative', top: 100, left: 100 },
  notif: {
    position: 'absolute',
  },
});
