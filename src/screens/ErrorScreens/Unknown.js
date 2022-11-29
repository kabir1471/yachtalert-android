import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TopBar from '../../components/TopBar';
import {deviceIdData, userData} from '../../core/GlobalData';
import {ROUTES} from '../../core/Index';
import {GlobalStyle} from '../../core/STYLES';

const Unknown = ({navigation}) => {
  const [data, setData] = userData.use();
  const [strings] = deviceIdData.use();
  useEffect(() => {
    const noSubTimeout = setTimeout(() => {
      navigation.navigate(ROUTES.DEVICE_ID_SCREEN);
    }, 20000);
    return () => {
      clearTimeout(noSubTimeout);
    };
  }, []);
  return (
    <View>
      <TopBar title={data.LanguageDict.Error} />
      <View style={styles.container}>
        <Text
          style={{
            ...GlobalStyle.title,
            color: `#${strings.FundamentalDict.MenuBarColor}`,
          }}>
          {data.LanguageDict.Error_NonExistentDeviceIDMain}
        </Text>
        <Text
          style={{
            ...GlobalStyle.subTitle,
            color: `#${strings.FundamentalDict.MenuBarColor}`,
          }}>
          {data.LanguageDict.Error_NonExistentDeviceIDSub}
        </Text>
      </View>
    </View>
  );
};

export default Unknown;

const styles = StyleSheet.create({
  container: {
    height: hp('85%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
});
