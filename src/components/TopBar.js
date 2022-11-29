import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../core/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Font} from '../core/Fonts';
import {deviceIdData} from '../core/GlobalData';
const TopBar = ({title}) => {
  const [preqRead] = deviceIdData.use();
  return (
    <LinearGradient
      start={{x: 0, y: 0.25}}
      end={{x: 1, y: 0}}
      style={{
        ...styles.header,
        backgroundColor: `#${preqRead.FundamentalDict.MenuBarColor}`,
      }}
      colors={[
        `#${preqRead.FundamentalDict.MenuBarColor}`,
        `#${preqRead.FundamentalDict.MenuBarColor}`,
      ]}>
      <Text
        style={{
          ...styles.headerText,
          color: `#${preqRead.FundamentalDict.MenuTextColor}`,
        }}>
        {title}
      </Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? hp('15%') : hp('9%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: hp('4%'),
    marginLeft: hp('2%'),
    marginBottom: hp('1%'),
    fontFamily: Font.THIN,
  },
});
export default TopBar;
