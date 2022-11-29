import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {deviceId, deviceIdData, userData} from '../../core/GlobalData';
import {GlobalStyle} from '../../core/STYLES';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {theme} from '../../core/Colors';
import {Font} from '../../core/Fonts';
const DetailScreen = () => {
  const [data, setData] = userData.use();
  const [id, setDeviceId] = deviceId.use();
  const [strings] = deviceIdData.use();

  return (
    <View style={GlobalStyle.container}>
      <TopBar title={data.LanguageDict.Title_Details} />
      <View style={{...GlobalStyle.contentContainer}}>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('14%'),
          }}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_AppVersionHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {'YachtAlert v1.02'}
            </Text>
            <Text
              style={{
                ...styles.detailText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_AppURL}
            </Text>
          </View>
        </View>
        <View style={{...GlobalStyle.card, height: hp('14%')}}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_DeviceIDHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {id.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={{...GlobalStyle.card, height: hp('23%')}}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_ContractStartHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.ContractStatus.ContractStart}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_ContractEndHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.ContractStatus.ContractEnd}
            </Text>
          </View>
          <View style={{flex: 0.3}} />
        </View>
        <View style={{...GlobalStyle.card, height: hp('14%')}}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Details_ContractStatusHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.LanguageDict.Screen_Details_ContractStatusActive}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  detailsText: {
    marginTop: 2,
    fontSize: hp('2.2%'),
    fontFamily: Font.REGULAR,
  },
  detailValueText: {
    paddingTop: hp('0.4%'),
    fontSize: hp('3.2%'),
    fontFamily: Font.THIN,
  },
  subText: {
    paddingTop: hp('0.2%'),
    fontSize: hp('2%'),
    fontFamily: Font.THIN,
  },
  detailText: {
    fontSize: hp('2%'),
    fontFamily: Font.THIN,
  },
});
