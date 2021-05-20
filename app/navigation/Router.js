import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  AsyncStorage,
  NativeModules,
  Platform,
  Dimensions
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../components/auth/Splash'
import LoginScreen from '../components/auth/Login'
import CompleteProfile from '../components/completeProfile/CompleteProfile'
import EmailSent from "../components/completeProfile/EmailSent";
import ForgotPassword from "../components/completeProfile/ForgotPasswordScreen";
import ResetPassword from "../components/completeProfile/ResetPasswordScreen";

import BookingScreen from '../components/booking/Booking'
import NotificationsScreen from '../components/notifications/Notifications'
import CreateScreen from '../components/create/Create'
import ProfileScreen from '../components/profile/Profile'
import SettingsScreen from '../components/setting/Settings'
import AccountSettings from '../components/setting/AccountSettings'
import ChangePassword from '../components/setting/ChangePassword'
import NottificatiosSettings from '../components/setting/NotificationsSettings'
import Preview from '../components/create/Preview'
import BookingDetails from '../components/create/BookingDetails'
import Review from '../components/create/review'
import Billings from '../components/payment/Billings'
import AthleteDetails from '../components/payment/PlayerDetails'
import { Colors } from '../style/colors'
import { FontFamily } from '../style/typograpy'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{
        headerTitle: 'SETTINGS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerLeft: null,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{
        headerTitle: 'ACCOUNT SETTINGS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
        headerTitle: 'CHANGE PASSWORD',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="NotificationsSettings" component={NottificatiosSettings} options={{
        headerTitle: 'NOTIFICATIONS SETTINGS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Billings" component={Billings} options={{
        headerTitle: 'MY BILLINGS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Bookingdetails" component={BookingDetails} options={{
        headerShown: false,
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
    </Stack.Navigator>
  )
}
function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{
        headerTitle: 'NOTIFICATIONS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerLeft: null,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />

    </Stack.Navigator>
  )
}
function CreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create" component={CreateScreen} options={{
        headerTitle: 'NEW BOOKING',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Preview" component={Preview} options={{
        headerTitle: 'PREVIEW',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />




    </Stack.Navigator>
  )
}
function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Booking" component={BookingScreen} options={{
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerShown: false,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Create" component={CreateStack} options={{
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerShown: false,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{
        headerTitle: 'ACCOUNT SETTINGS',
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Bookingdetails" component={BookingDetails} options={{
        headerShown: false,
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="AthleteDetails" component={AthleteDetails} options={{
        headerShown: null,
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
      <Stack.Screen name="Review" component={Review} options={{
        headerShown: false,
        headerTitleAllowFontScaling: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
    </Stack.Navigator>
  )
}
function TabContainer() {
  return (
    <Tab.Navigator
      shifting={false}
      tabBarOptions={{
        headerShown: true,
        activeTintColor: Colors.buttonColor,
        inactiveTintColor: 'gray',
        style: {
          paddingBottom: 9,
          height: 58,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }
      }}

      barStyle={{
        backgroundColor: Colors.whiteColor,
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        padding: 30

      }}>
      <Tab.Screen name="Booking" component={BookingStack} options={{
        tabBarLabel: "Bookings",
        tabBarIcon: ({ inactiveTintColor, activeTintColor, focused }) => (

          <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/booking.png')} style={{ height: 20, width: 20 }} />

        ),
      }} />
      <Tab.Screen name="NotificationsStack" component={NotificationsStack} options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ focused }) => (

          <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/notification.png')} style={{ height: 20, width: 20 }} />

        )
      }} />
      {/* <Tab.Screen name="Create" component={CreateScreen} options={{
        tabBarLabel: "Create",
        tabBarIcon: ({ focused }) => (

          <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/add.png')} style={{ height: 20, width: 20 }} />

        )
      }} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ focused }) => (

          <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/user.png')} style={{ height: 20, width: 20 }} />

        )
      }} /> */}
      <Tab.Screen name="SettingsStack" component={SettingsStack}
        options={({ navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: exploreState } = routes[index];
          let tabBarVisible = true;
          if (exploreState) {
            const { routes: exploreRoutes, index: exploreIndex } = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (exploreActiveRoute.name === "ChangePassword") { tabBarVisible = false };
          }
          return {
            headerShown: false,
            tabBarVisible,
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused }) => (
              <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/settings.png')} style={{ height: 20, width: 20 }} />
            )
          };
        }}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (

            <Image tintColor={focused ? Colors.buttonColor : 'gray'} source={require('../assets/settings.png')} style={{ height: 20, width: 20 }} />

          )
        }} />
    </Tab.Navigator>

  )
}



function Router() {
  return (

    <NavigationContainer >
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen name={'TabContainer'} component={TabContainer} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen
          name="EmailSent"
          component={EmailSent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{
          headerTitle: 'REGISTERATION',
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Router