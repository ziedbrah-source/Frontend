import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_IMAGE =
  'https://m.media-amazon.com/images/I/61ZZMqjlfSL._AC_SX466_.jpg';
const CameraItem = ({ camera }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Camera', { id: camera.id });
  };
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
          <Text style={styles.title}>Your Cam ID: {camera.id}</Text>
          <Text style={styles.subtitle}>
            Puchase date is : {new Date(camera.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

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

export default CameraItem;
