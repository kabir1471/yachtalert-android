/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AppState,
  Alert,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TopBar from '../../components/TopBar';
import {theme} from '../../core/Colors';
import {
  userData,
  deviceId,
  languageString,
  endpoints,
  deviceIdData,
  gLoading,
} from '../../core/GlobalData';
import {GlobalStyle} from '../../core/STYLES';
import messaging from '@react-native-firebase/messaging';
import {refreshData, storeToken} from '../../core/api';
import {ROUTES} from '../../core/Index';
// import {setBadgeCount} from 'react-native-notification-badge';
import {Font} from '../../core/Fonts';

const HomeScreen = ({navigation}) => {
  const [data] = userData.use();
  const [id] = deviceId.use();
  const [lang] = languageString.use();
  const [url] = endpoints.use();
  const [preqRead] = deviceIdData.use();
  const [globalLoading, setGlobalLoading] = gLoading.use();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    // clearStorage();
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      refreshData(id, url.fullread, lang, setGlobalLoading);
      const permissions = await messaging().hasPermission();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    requestPermission();
    messaging().onNotificationOpenedApp(async remoteMessage => {
      const permissions = await messaging().hasPermission();
      navigation.navigate(ROUTES.ALERTS_SCREEN);
    });

    messaging()
      .getInitialNotification({badge: true, sound: true, alert: true})
      .then(async remoteMessage => {
        if (remoteMessage) {
          const permissions = await messaging().hasPermission();
          Alert.alert(JSON.stringify(remoteMessage.notification.title));
          navigation.navigate(ROUTES.ALERTS_SCREEN);
        }
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        JSON.stringify(remoteMessage.notification.body),
      );
    });
    return unsubscribe;
  }, []);

  async function requestPermission() {
    let granted = await messaging().requestPermission({
      badge: true,
      sound: true,
    });
    const enabled =
      granted === messaging.AuthorizationStatus.AUTHORIZED ||
      granted === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // setBadgeCount(0);
      const fcmToken = await messaging().getToken();
      await storeToken(url.storetoken, id, fcmToken);
    } else {
      alert('User declined notifications permissions');
    }
  }

  return (
    <View
      style={{
        ...GlobalStyle.container,
      }}>
      <TopBar title={data.LanguageDict.Title_MainMenu} />
      <Text
        style={{
          ...GlobalStyle.updateText,
          color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
        }}>
        {!globalLoading
          ? data.TimeSinceLastDataUpdateMessage
          : data.LanguageDict.ConnectState}
      </Text>
      <View style={GlobalStyle.contentContainer}>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('15%'),
            flexDirection: 'row',
          }}>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Main_OverallHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.HealthMessageMain}
            </Text>
            <Text
              style={{
                ...styles.detailText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
                fontSize: hp('2%'),
                marginTop: hp('0.5%'),
              }}>
              {data.HealthMessageSub}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: hp('9%'), width: hp('9%')}}
              source={{uri: data.HealthEmoticonPath}}
            />
          </View>
        </View>
        <View style={{...GlobalStyle.card, height: hp('12%')}}>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_BilgeWaterHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.BilgeStatusCurrent}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('19%'),
          }}>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_MainBatteryHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.BatteryLevelMainBatteryCurrent}
            </Text>
          </View>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_StarterBatteryHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.BatteryLevelStarterBatteryCurrent}
            </Text>
          </View>
          <View style={{flex: 0.7}} />
        </View>
        <View style={{...GlobalStyle.card, height: hp('20%')}}>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Main_LatitudeHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.CoordinatesCurrent.Latitude}
            </Text>
          </View>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Main_LongitudeHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${preqRead.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.CoordinatesCurrent.Longitude}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                fontFamily: Font.THIN,
                fontSize: hp('2%'),
                color: `#${preqRead.FundamentalDict.ItemTextMainColor}`,
              }}>
              {!globalLoading
                ? data.TimeSinceLastFixUpdateMessage
                : data.LanguageDict.ConnectState}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  detailFieldContainer: {
    flex: 0.25,
    padding: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  locationContainer: {
    flex: 0.4,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsText: {
    marginTop: hp('0.2%'),
    fontSize: hp('2.3%'),
    fontFamily: Font.REGULAR,
  },
  detailValueText: {
    fontSize: Platform.OS === 'ios' ? hp('3.5%') : hp('3.2%'),
    color: theme.colors.font,
    fontFamily: Font.THIN,
    marginTop: hp('0.4%'),
  },
  detailText: {
    fontSize: hp('1.7%'),
    fontFamily: Font.THIN,
  },
});
