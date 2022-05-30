import { StyleSheet, FlatList, View, Text, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import LoadingOverlay from './ui/LoadingOverlay';
export default NotificationList = ({ notifications }) => {
  //console.log(notifications);
  const [notificationsState, setNotificationsState] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const notificationsArr = [];
    for (const key in notifications) {
      let Notif = {};
      Notif['createdAt'] = notifications[key].createdAt;
      Notif['id'] = notifications[key].id;
      Notif['longitude'] = notifications[key].longitude;
      Notif['latitude'] = notifications[key].latitude;
      Notif['cameraId'] = notifications[key].cameraId;
      notificationsArr.push(Notif);
    }
    notificationsArr.reverse();
    setNotificationsState(notificationsArr);
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <LoadingOverlay message="Loading your Notifications"></LoadingOverlay>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={[
          styles.page,
          notifications.length <= 0 ? styles.rootContainer : styles.page,
        ]}
      >
        {notifications.length == 0 && (
          <Text style={(styles.rootContainer, styles.title)}>
            No Cameras for You YET 🤓
          </Text>
        )}
        {notifications.length > 0 && (
          <FlatList
            data={notificationsState}
            renderItem={({ item }) => <NotificationItem notification={item} />}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
