import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { React, useContext, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import { getCameraById } from '../util/cameras';
import CameraItem from '../components/CameraItem';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Header from '../components/Header';
import NotificationItem from '../components/NotificationItem';
const CameraDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [notificationsState, setNotificationsState] = useState([]);
  const [camera, setCamera] = useState(null);
  const token = useContext(AuthContext).token;

  const id = route.params?.id;
  useEffect(async () => {
    async function getCamera(token, id) {
      return await getCameraById(token, id);
    }
    const camera = await getCamera(token, id);
    setCamera(camera);
    const notificationsArr = [];
    for (const key in camera.notifications) {
      let Notif = {};
      Notif['createdAt'] = camera.notifications[key].createdAt;
      Notif['id'] = camera.notifications[key].id;
      Notif['longitude'] = camera.notifications[key].longitude;
      Notif['latitude'] = camera.notifications[key].latitude;
      Notif['cameraId'] = camera.notifications[key].cameraId;
      notificationsArr.push(Notif);
    }
    notificationsArr.reverse();
    setNotificationsState(notificationsArr);

    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingOverlay message={'Retreiving the Camera'}></LoadingOverlay>;
  }
  return (
    <SafeAreaView>
      <Header message="Your camera Details"></Header>
      <CameraItem camera={camera}></CameraItem>
      <FlatList
        data={notificationsState}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
};

export default CameraDetailsScreen;

const styles = StyleSheet.create({});
