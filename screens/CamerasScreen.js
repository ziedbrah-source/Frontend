import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../store/auth-context';
import { getAllCamerasForUser, createCamera } from '../util/cameras';
import CameraItem from '../components/CameraItem';
export default CamerasScreen = () => {
  const [cameras, setCameras] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(async () => {
    async function getAllCameras(token) {
      return await getAllCamerasForUser(token);
    }
    const camerasResult = await getAllCameras(authCtx.token);
    const Cameras = [];
    for (const camera in camerasResult) {
      let Camera = {};
      Camera['createdAt'] = camerasResult[camera].createdAt;
      Camera['id'] = camerasResult[camera].id;
      Cameras.push(Camera);
    }
    Cameras.reverse();
    setCameras(Cameras);
  }, []);
  return (
    <View style={styles.page}>
      <FlatList
        data={cameras}
        renderItem={({ item }) => <CameraItem camera={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
