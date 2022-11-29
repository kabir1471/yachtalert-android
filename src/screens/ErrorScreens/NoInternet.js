import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TopBar from '../../components/TopBar';
import {theme} from '../../core/Colors';
import {Font} from '../../core/Fonts';
import {GlobalStyle} from '../../core/STYLES';

const NoInternet = ({navigation}) => {
  useEffect(async () => {
    const splashScreenTimer = setTimeout(() => {
      navigation.goBack();
    }, 20000);
    return () => {
      clearTimeout(splashScreenTimer);
    };
  }, []);
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0.25}}
        end={{x: 1, y: 0}}
        style={{
          ...styles.header,
          backgroundColor: theme.colors.splashScreenGradient2,
        }}
        colors={[
          theme.colors.splashScreenGradient2,
          theme.colors.splashScreenGradient2,
        ]}>
        <Text
          style={{
            ...styles.headerText,
            color: theme.colors.white,
          }}>
          Error
        </Text>
      </LinearGradient>
      <View style={styles.container}>
        <Text style={{...GlobalStyle.title}}>
          {'Cloud service not reachable!'}
        </Text>
        <Text style={GlobalStyle.subTitle}>
          {'Please check your internet connection'}
        </Text>
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    height: hp('85%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: Platform.OS === 'ios' ? hp('15%') : hp('10'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',

    marginLeft: hp('2%'),
    marginBottom: hp('1%'),
    fontFamily: Font.THIN,
  },
});
