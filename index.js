/**
 * @format
 */
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
// import {getBadgeCount, setBadgeCount} from 'react-native-notification-badge';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message received")
});

AppRegistry.registerComponent(appName, () => App);
