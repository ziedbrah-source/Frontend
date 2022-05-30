import { StyleSheet, FlatList, View, Text, SafeAreaView } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../store/auth-context';
import { getAllCamerasForUser, createCamera } from '../util/cameras';
import CameraItem from '../components/CameraItem';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
export default CamerasScreen = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <LoadingOverlay message={'Retreiving Cameras'}>
        <Header message="Welcome John Doe"></Header>
      </LoadingOverlay>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header message="Welcome John Doe"></Header>
      <View
        style={[
          styles.page,
          cameras.length <= 0 ? styles.rootContainer : styles.page,
        ]}
      >
        {cameras.length == 0 && (
          <Text style={(styles.rootContainer, styles.title)}>
            No Cameras for You YET 🤓
          </Text>
        )}
        {cameras.length > 0 && (
          <FlatList
            data={cameras}
            renderItem={({ item }) => <CameraItem camera={item} />}
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
