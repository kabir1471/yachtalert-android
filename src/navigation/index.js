import React, {useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../core/Index';
import SplashScreen from '../screens/MainScreens/SplashScreen';
import DeviceIdScreen from '../screens/MainScreens/DeviceIdScreen';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import {deviceIdData, userData} from '../core/GlobalData';
import {View, Image, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {theme} from '../core/Colors';
import MapScreen from '../screens/AppScreens/MapScreen';
import BilgeScreen from '../screens/AppScreens/BilgeScreen';
import AlertsScreen from '../screens/AppScreens/AlertsScreen';
import DetailScreen from '../screens/AppScreens/DetailScreen';
import BateryScreen from '../screens/AppScreens/BateryScreen';
import NoSubscription from '../screens/ErrorScreens/NoSubscription';
import NoInternet from '../screens/ErrorScreens/NoInternet';
import Unknown from '../screens/ErrorScreens/Unknown';
import {Font} from '../core/Fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name={ROUTES.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen
          name={ROUTES.DEVICE_ID_SCREEN}
          options={{unmountOnBlur: true}}
          component={DeviceIdScreen}
        />
        <Stack.Screen name={ROUTES.HOME_SCREEN} component={BottomTab} />
        <Stack.Screen
          name={ROUTES.EXPIRED_SUBSCRIPTION}
          component={NoSubscription}
        />
        <Stack.Screen name={ROUTES.NO_INTERNET} component={NoInternet} />
        <Stack.Screen name={ROUTES.NOT_FOUND} component={Unknown} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTab = () => {
  const [data, setData] = userData.use();
  const [preqRead] = deviceIdData.use();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case ROUTES.HOME_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Home.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
            case ROUTES.MAP_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Map.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
            case ROUTES.BILGE_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Bilge.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
            case ROUTES.BATERY_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Battery.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
            case ROUTES.ALERTS_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Alerts.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
            case ROUTES.DETAILS_SCREEN:
              return (
                <Image
                  resizeMode="contain"
                  source={require('../assets/Details.png')}
                  style={{height: hp('3%'), width: hp('3%')}}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        labelStyle: {
          fontFamily: Font.REGULAR,
          fontSize: hp('1.5%'),
          color: `#${preqRead.FundamentalDict.MenuTextColor}`,
        },
        activeTintColor: `#${preqRead.FundamentalDict.MenuTextColor}`,
        inactiveTintColor: `#${preqRead.FundamentalDict.MenuTextColor}`,
        style: {
          backgroundColor: `#${preqRead.FundamentalDict.MenuBarColor}`,
          height: hp('10%'),
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Home,
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name={ROUTES.MAP_SCREEN}
        component={MapScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Map,
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name={ROUTES.BILGE_SCREEN}
        component={BilgeScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Bilge,
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name={ROUTES.BATERY_SCREEN}
        component={BateryScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Battery,
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name={ROUTES.ALERTS_SCREEN}
        component={AlertsScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Alerts,
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name={ROUTES.DETAILS_SCREEN}
        component={DetailScreen}
        options={{
          tabBarLabel: data.LanguageDict.BottomMenu_Details,
          tabBarButton: CustomTabButton,
        }}
      />
    </Tab.Navigator>
  );
};

const CustomTabButton = props => {
  const [preqRead] = deviceIdData.use();
  return (
    <TouchableOpacity
      {...props}
      style={
        props.accessibilityState.selected
          ? [
              props.style,
              {
                borderBottomColor: `#${preqRead.FundamentalDict.MenuTextColor}`,
                borderBottomWidth: 3,
                paddingVertical: 1,
              },
            ]
          : [
              props.style,
              {
                borderBottomColor: `#${preqRead.FundamentalDict.MenuBarColor}`,
                borderBottomWidth: 3,
                paddingVertical: 1,
              },
            ]
      }
    />
  );
};
export default RootNavigator;
