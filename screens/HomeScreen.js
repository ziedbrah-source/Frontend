import { StyleSheet, Text, View } from 'react-native';
function HomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome to Attention+ 😃 </Text>
      <Text style={styles.sub}>
        Checkout your cameras and notifications Below!
      </Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
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
  sub: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
