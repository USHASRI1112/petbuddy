import React, {useContext, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from './src/screens/Main/MainScreen';
import Login from './src/screens/Login/LoginScreen';
import Register from './src/screens/Register/RegisterScreen';
import Home from './src/screens/Home/HomeScreen';
import Services from './src/tabs/Services/ServiceTab';
import Training from './src/tabs/Training/TrainingTab';
import Activity from './src/screens/Activity/ActivityScreen';
import Reminders from './src/screens/Reminders/ReminderScreen';
import PetScreen from './src/screens/PetScreen/PetScreen';
import Profile from './src/screens/Profile/ProfileScreen';
import GalleryScreen from './src/screens/Gallery/GalleryScreen';
import {Image, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './src/Context/Context';
import Loader from './src/screens/Loader/LoaderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'forestgreen'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pet" component={PetScreen} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
}

export function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;
          switch (route.name) {
            case 'HomeScreen':
              iconSource = require('./public/assets/Tabs/homefilled.png');
              break;
            case 'Services':
              iconSource = require('./public/assets/Tabs/services.jpg');
              break;
            case 'Training':
              iconSource = require('./public/assets/Tabs/traini.png');
              break;
          }
          return (
            <View
              style={[
                focused
                  ? {
                      alignItems: 'center',
                      backgroundColor: 'darkgreen',
                      width: 50,
                      borderRadius: 10,
                    }
                  : {alignItems: 'center'},
              ]}>
              <Image
                source={iconSource}
                style={{width: 30, height: 30, borderRadius: 20}}
                resizeMode="cover"
              />
            </View>
          );
        },
        tabBarLabel: route.name,
        tabBarStyle: {
          backgroundColor: 'green',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: 'white',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Training" component={Training} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  let initial = 'Main';
  const userContext = useContext(UserContext);
  if (!userContext) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  const {user, setUser} = userContext;
  let loggedInUser: any;
  useEffect(() => {
    const fetchUser = async () => {
      loggedInUser = await AsyncStorage.getItem('loggedInUser');
      console.log('loggedInUser', loggedInUser);
      if (loggedInUser) {
        console.log('loggedInUser', loggedInUser.name);
        initial = 'Home';
        setUser(JSON.parse(loggedInUser));
      }
    };
    fetchUser();      
    console.log('Username', user?.name);
  }, []);

  return (
    <Stack.Navigator initialRouteName={initial}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Loading"
        component={Loader}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
