/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet, 
  NativeModules, 
  Image, 
  Platform,
  Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../core/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getDeviceId, _getIDScreenStrings} from '../../core/utills';
import {ROUTES} from '../../core/Index';
import {deviceId, endpoints, languageString} from '../../core/GlobalData';
import {getData, getEndpoints} from '../../core/api';
import {useIsFocused} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getPreqData = async () => {
    const id = await getDeviceId();
    const tempUrl = await getEndpoints(id, navigation);
    if (!tempUrl.fullread) {
      navigation.navigate(ROUTES.NO_INTERNET);
      return null;
    } else {
      endpoints.set(tempUrl);
      const locale =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier;
      const mLang = locale.split('_')[0];
      languageString.set(mLang);
      await _getIDScreenStrings(mLang, tempUrl.preqrread);
      return {mLang, tempUrl};
    }
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  useEffect(async () => {
    const res = await getPreqData();
    fadeIn()
    const splashScreenTimer = setTimeout(() => {
      if (res) {
        getID(res.mLang, res.tempUrl);
      }
    }, 2000);
    return () => {
      clearTimeout(splashScreenTimer);
    };
  }, [isFocused]);
  const getID = async (language, tempUrl) => {
    const id = await getDeviceId();
    deviceId.set(id);
    if (id) {
      getData(id, tempUrl.fullread, language, setLoading, navigation);
    } else {
      navigation.navigate(ROUTES.DEVICE_ID_SCREEN);
    }
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[theme.colors.black, theme.colors.black]}
      style={styles.linearGradient}>
      <Animated.Image
        source={require('../../assets/splashScreen.png')}
        style={[
          styles.logo,
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }
        ]}
      />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp('25%'),
    width: wp('90%'),
    resizeMode: 'contain',
  },
});
