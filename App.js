import 'react-native-gesture-handler';
import { useContext, useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NotificationScreenDetails from './screens/NotificationScreenDetails';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawer from './components/ui/CustomDrawer';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CamerasScreen from './screens/CamerasScreen.js';
import NotificationsScreen from './screens/NotificationsScreen';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CameraDetailsScreen from './screens/CameraDetailsScreen';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const fetchFont = () => {
  return Font.loadAsync({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
};

const AuthentificationStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={CamerasScreen} />
      <HomeStack.Screen
        name="Camera"
        component={CameraDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Notification"
        component={NotificationScreenDetails}
      />
    </HomeStack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home 2"
        component={HomeStackNavigator}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Cameras"
        component={CamerasScreen}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
function AuthStack() {
  return (
    <AuthentificationStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#F9FBFC' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#F9FBFC' },
      }}
    >
      <AuthentificationStack.Screen name="Login" component={LoginScreen} />
      <AuthentificationStack.Screen name="Signup" component={SignupScreen} />
      <AuthentificationStack.Screen
        name="ConfirmEmail"
        component={ConfirmEmailScreen}
      />
      <AuthentificationStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthentificationStack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
      />
    </AuthentificationStack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  const authCtx = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      authCtx.putDeviceToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => {
          console.log('ERROR ON LOADING');
        }}
        onFinish={() => {
          setFontLoaded(true);
        }}
      ></AppLoading>
    );
  }
  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <AuthContextProvider>
        <Root />
        {/* <ConfirmEmailScreen></ConfirmEmailScreen> */}
      </AuthContextProvider>
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
