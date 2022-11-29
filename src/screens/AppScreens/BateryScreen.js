/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {GlobalStyle} from '../../core/STYLES';
import {
  deviceId,
  deviceIdData,
  gLoading,
  userData,
} from '../../core/GlobalData';
import TabBar from '../../components/TabBar';
import {setColor} from '../../core/utills';
import {theme} from '../../core/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {Font} from '../../core/Fonts';
import {useIsFocused} from '@react-navigation/native';

let minValue = 5;
let maxValue = 90;

const DEVICE_HEIGHT = Dimensions.get("screen").height

function* yLabel() {
  yield* [minValue, '', maxValue];
}

const BateryScreen = () => {
  const [data, setData] = userData.use();
  const [id, setDeviceId] = deviceId.use();
  const [bateryData, setBateryData] = useState(
    data.BatteryLevelHistoryPeriodShort,
  );
  const [globalLoading, setGlobalLoading] = gLoading.use();
  const [strings] = deviceIdData.use();
  const [dataMultiple, setDataMultiple] = useState(1);
  const [activeBarColor, setActiveBarColor] = useState({
    tabOne: `#${strings.FundamentalDict.MenuBarColor}`,
    textOne: theme.colors.white,
    tabTwo: theme.colors.white,
    textTwo: `#${strings.FundamentalDict.MenuBarColor}`,
    tabThree: theme.colors.white,
    textThree: `#${strings.FundamentalDict.MenuBarColor}`,
  });
  const isFocused = useIsFocused();
  const yLabelIterator = yLabel();

  useEffect(() => {
    redrawGraphs();
    return () => setBateryData([]);
  }, [isFocused, data]);

  const redrawGraphs = () => {
    switch (dataMultiple) {
      case 1:
        _getDataForGraph('one');
        break;
      case 6:
        _getDataForGraph('two');
        break;
      case 35:
        _getDataForGraph('three');
        break;
    }
  };

  const _getDataForGraph = item => {
    switch (item) {
      case 'one':
        setDataMultiple(1);
        setBateryData(data.BatteryLevelHistoryPeriodShort);
        break;
      case 'two':
        setDataMultiple(6);
        setBateryData(data.BatteryLevelHistoryPeriodMid);
        break;
      case 'three':
        setDataMultiple(35);
        setBateryData(data.BatteryLevelHistoryPeriodLong);
        minValue = data.BatteryLevelHistoryPeriodLong?.reduce(function (
          prev,
          curr,
        ) {
          return prev.BatteryLevel < curr.BatteryLevel ? prev : curr;
        }).BatteryLevel;
        break;
      default:
        break;
    }
  };
  return (
    <View style={GlobalStyle.container}>
      <TopBar title={data.LanguageDict.Title_Battery} />
      <TabBar
        onClick={item => {
          _getDataForGraph(item);
          setColor(
            item,
            setActiveBarColor,
            `#${
              strings.FundamentalDict.MenuBarColor ||
              theme.colors.splashScreenGradient2
            }`,
          );
        }}
        activeBarColor={activeBarColor}
      />
      <Text
        style={{
          ...GlobalStyle.updateText,
          color: `#${strings.FundamentalDict.ItemTextMainColor}`,
        }}>
        {!globalLoading
          ? data.TimeSinceLastDataUpdateMessage
          : data.LanguageDict.ConnectState}
      </Text>
      <View style={{...GlobalStyle.contentContainerWithTabBar}}>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('30%'),
          }}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_MainBatteryHeader}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  ...styles.detailValueText,
                  color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
                }}>
                {data.BatteryLevelMainBatteryCurrent}
              </Text>
              <Text
                style={{
                  ...styles.detailValueText,
                  color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
                }}>
                {data.MainBatteryPercentage}
              </Text>
            </View>
            <Text
              style={{
                ...styles.detailText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.MainBatteryStatus}
            </Text>
          </View>
          {isFocused && bateryData.length !== 0 && (
            <LineChart
              data={{
                labels: bateryData.map((item, index) => {
                  if (index % dataMultiple === 0) {
                    return moment(item.TimeStamp || '').format('DD/MMM');
                  }
                  if (index === bateryData.length - 1) {
                    return moment(item.TimeStamp || '').format('DD/MMM');
                  } else {
                    return '';
                  }
                }),
                datasets: [
                  {
                    data: bateryData?.map((item) => {
                      return parseFloat(item.BatteryLevel || 0);
                    }),
                    color: (opacity = 1) => 'rgba(0, 0, 0, 1)',
                    strokeWidth: 1.5,
                  },
                ],
              }}
              width={wp('85%')} // from react-native
              height={DEVICE_HEIGHT < 600 ? hp("14%"): hp('15%')}
              withVerticalLabels={true}
              yAxisInterval={1}
              segments={6}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {fontSize: hp('1%')},
                propsForDots: {
                  r: '0.25',
                  strokeWidth: '0.25',
                  stroke: 'black',
                },
              }}
              bezier
              style={{
                height: hp("19%"),
                borderRadius: 8,
                paddingRight: wp('10%'),
                paddingBottom: hp("4%"),
              }}
              
            />
          )}
        </View>
        <View style={{...GlobalStyle.card, height: hp('30%')}}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_StarterBatteryHeader}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between"
                }}>
              <Text
                style={{
                  ...styles.detailValueText,
                  color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
                }}>
                {data.BatteryLevelStarterBatteryCurrent}
              </Text>
              <Text
                style={{
                  ...styles.detailValueText,
                  color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
                }}>
                {data.StarterBatteryPercentage}
              </Text>
            </View>
            <Text
              style={{
                ...styles.detailText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.StarterBatteryStatus}
            </Text>
          </View>
          {isFocused && bateryData.length !== 0 && (
            <LineChart
              data={{
                labels: bateryData.map((item, index) => {
                  if (index % dataMultiple === 0) {
                    return moment(item.TimeStamp).format('DD/MMM');
                  }
                  if (index === bateryData.length - 1) {
                    return moment(item.TimeStamp).format('DD/MMM');
                  } else {
                    return '';
                  }
                }),
                datasets: [
                  {
                    data: bateryData.map((item, index) => {
                      return parseFloat(item.Battery2Level || 0);
                    }),
                    color: (opacity = 1) => 'rgba(0, 0, 0, 1)',
                    strokeWidth: 1.5,
                  },
                ],
              }}
              width={wp('85%')} // from react-native
              height={DEVICE_HEIGHT < 600 ? hp("14%"): hp('15%')}
              withVerticalLabels={true}
              yAxisInterval={1}
              segments={6}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                propsForVerticalLabels: {},
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {fontSize: hp('1%')},
                propsForDots: {
                  r: '0.25',
                  strokeWidth: '0.25',
                  stroke: 'black',
                },
              }}
              bezier
              style={{
                height:hp("19%"),
                marginTop: hp("0.5%"),
                borderRadius: 8,
                paddingRight: wp('10%'),
                paddingBottom: hp("4%")
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default BateryScreen;

const styles = StyleSheet.create({
  detailsText: {
    marginTop: hp("0.2%"),
    fontSize: hp('2.3%'),
    fontFamily: Font.REGULAR,
  },
  detailValueText: {
    fontSize: hp('3.2%'),
    fontWeight: '800',
    fontFamily: Font.THIN,
    marginTop: hp('0.2%'),
  },
  detailText: {
    fontSize: hp('2%'),
    fontFamily: Font.THIN,
  },
});
