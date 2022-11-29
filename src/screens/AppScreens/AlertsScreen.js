import React, {useRef, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AppState,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../../components/TopBar';
import {
  deviceId,
  deviceIdData,
  endpoints,
  gLoading,
  languageString,
  userData,
} from '../../core/GlobalData';
import {GlobalStyle} from '../../core/STYLES';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {theme} from '../../core/Colors';
import {sendTestNotification} from '../../core/api';
import {useRequest} from '../../core/hooks/request';
import {Font} from '../../core/Fonts';
import PushNotification from "react-native-push-notification";
import { useIsFocused } from '@react-navigation/native';

const AlertsScreen = ({navigation}) => {
  const [data, setData] = userData.use();
  const [id] = deviceId.use();
  const [lang] = languageString.use();
  const [urls] = endpoints.use();
  const [loading, setLoading] = useState(false);
  const [strings] = deviceIdData.use();
  const [globalLoading, setGlobalLoading] = gLoading.use();
  const isFocused = useIsFocused()
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const notification = useRequest(() =>
    sendTestNotification(id, urls, lang, setLoading, setGlobalLoading)
  );

  const sendTestNot = () => {
    notification.execute();
  };

  useEffect(() => {
    // clearStorage();
    if(AppState.currentState === "active" && isFocused){
      PushNotification.removeAllDeliveredNotifications();
    }
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isFocused]);
  const _handleAppStateChange = async nextAppState => {
    console.log(isFocused)
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' && isFocused
    ) {
      PushNotification.removeAllDeliveredNotifications();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.itemContainer,
        }}>
        <Text
          style={{
            fontSize: hp('2%'),
            fontFamily: Font.THIN,
            color: `#${strings.FundamentalDict.ItemTextMainColor}`,
          }}>
          {item.TimeStamp}
        </Text>
        <Text
          style={{
            fontSize: hp('2%'),
            fontFamily: Font.THIN,
            color: `#${strings.FundamentalDict.ItemTextMainColor}`,
          }}>
          {item.MessageText}
        </Text>
      </View>
    );
  };

  return (
    <View style={GlobalStyle.container}>
      <TopBar title={data.LanguageDict.Title_Alerts} />
      <Text />
      <View style={GlobalStyle.contentContainer}>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('65%'),
            justifyContent: 'flex-start',
            backgroundColor: theme.colors.white,
          }}>
          <Text
            style={{
              ...styles.detailsText,
              color: `#${strings.FundamentalDict.ItemTextMainColor}`,
            }}>
            {data.LanguageDict.Screen_Alerts_ReceivedAlertsHeader}
          </Text>
          <View style={{height: hp('50%')}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.SentNotifications}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: `#${strings.FundamentalDict.MenuBarColor}`,
            }}
            onPress={sendTestNot}>
            {loading ? (
              <ActivityIndicator
                animating
                color={`#${strings.FundamentalDict.MenuTextColor}`}
              />
            ) : (
              <Text
                style={{
                  ...styles.buttonText,
                  color: `#${strings.FundamentalDict.MenuTextColor}`,
                }}>
                {data.LanguageDict.Screen_Alerts_TestButtonText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: hp('1.2%'),
    height: hp('6%'),
    width: wp('50%'),
    borderRadius: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: hp('2.7%'),
    fontFamily: Font.THIN,
  },
  itemContainer: {
    height: hp('5%'),
    marginTop: hp('2.4%'),
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
  },
  detailsText: {
    marginTop: 2,
    fontSize: hp('2.3%'),
    fontFamily: Font.REGULAR,
  },
});
