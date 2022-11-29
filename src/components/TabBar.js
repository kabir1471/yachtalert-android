import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {theme} from '../core/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {deviceIdData, userData} from '../core/GlobalData';
import {Font} from '../core/Fonts';
const TabBar = ({onClick, activeBarColor}) => {
  const [data, setData] = userData.use();
  const [strings] = deviceIdData.use();
  return (
    <View
      style={{
        ...styles.tabbarContainer,
        borderColor: `#${strings.FundamentalDict.MenuBarColor}`,
      }}>
      <TouchableOpacity
        onPress={() => {
          onClick('one');
        }}
        style={{
          ...styles.tab,
          backgroundColor: activeBarColor.tabOne,
          borderTopLeftRadius: hp('0.7%'),
          borderBottomLeftRadius: hp('0.7%'),
        }}>
        <Text style={{...styles.tabText, color: activeBarColor.textOne}}>
          {data.LanguageDict.General_ButtonWeek}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClick('two');
        }}
        style={{
          ...styles.tab,
          backgroundColor: activeBarColor.tabTwo,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: `#${strings.FundamentalDict.MenuBarColor}`,
        }}>
        <Text
          style={{
            ...styles.tabText,
            color: activeBarColor.textTwo,
          }}>
          {data.LanguageDict.General_ButtonMonth}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClick('three');
        }}
        style={{
          ...styles.tab,
          backgroundColor: activeBarColor.tabThree,
          borderTopRightRadius: hp('0.7%'),
          borderBottomRightRadius: hp('0.7%'),
        }}>
        <Text style={{...styles.tabText, color: activeBarColor.textThree}}>
          {data.LanguageDict.General_ButtonYear}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbarContainer: {
    height: hp('5%'),
    alignSelf: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: hp('1%'),

    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp('2%'),
  },
  tab: {
    width: wp('31%'),
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabText: {
    fontSize: hp('2.2%'),
    fontWeight: '500',
    fontFamily: Font.THIN,
  },
});
