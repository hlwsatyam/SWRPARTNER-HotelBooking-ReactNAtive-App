import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/pages/splash/Splash';
import HomePage from './src/pages/HomePage/HomePage';
import LoginScreen from './src/pages/Auth/Login';
import ForgotPassword from './src/pages/Auth/ForgotPassword';
import CreateAccount from './src/pages/Auth/CreateAccount';
import AppSetting from './src/data/Setting/AppSetting';
import AddHotel from './src/pages/AddHotel/AddHotel';
import UpdateHotel from './src/pages/AddHotel/UpdateHotel';
import PrivacyPolicy from './src/pages/Policies/Privacy';
import HelpSupport from './src/pages/Policies/HelpSupport';
import TermsConditions from './src/pages/Policies/Terms';
import BookingStatus from './src/pages/BookingStatus/BookingStatus';
import Wallet from './src/pages/Payment/Wallet';
import ShowRooms from './src/pages/Rooms/ShowRooms';
import AddRoom from './src/pages/Rooms/AddRoom';
import {AlertNotificationRoot, Toast} from 'react-native-alert-notification';
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <AlertNotificationRoot>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'green'}
        hidden={false}
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="forgetPassword" component={ForgotPassword} />
          <Stack.Screen name="createAccount" component={CreateAccount} />
          <Stack.Screen name="RoomListing" component={ShowRooms} />
          <Stack.Screen name="AddRoom" component={AddRoom} />
          <Stack.Screen name="Status" component={BookingStatus} />
          <Stack.Screen name="addHotel" component={AddHotel} />
          <Stack.Screen name="AppSetting" component={AppSetting} />
          <Stack.Screen name="updateHotel" component={UpdateHotel} />
          {/* POLICIES */}
          {/* <Stack.Screen name="updateHotel" component={UpdateHotel} />  */}
          <Stack.Screen name="PrivacyAndPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="HelpAndSupport" component={HelpSupport} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
  );
};
export default App;