/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {GlobalStyle} from '../../core/STYLES';
import {
  deviceId,
  deviceIdData,
  gLoading,
  userData,
} from '../../core/GlobalData';
import TabBar from '../../components/TabBar';
import {theme} from '../../core/Colors';
import {setColor} from '../../core/utills';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Font} from '../../core/Fonts';

function* yLabel() {
  yield* ['No', '', 'Yes'];
}

const BilgeScreen = ({navigation}) => {
  const [data, setData] = userData.use();
  const [id, setDeviceId] = deviceId.use();
  const [activeData, setActiveData] = useState(
    data.BilgeStatusHistoryPeriodShort,
  );
  const [dataMultiple, setDataMultiple] = useState(1);
  const [interval, setInterval] = useState(7);
  const [strings] = deviceIdData.use();
  const [globalLoading, setGlobalLoading] = gLoading.use();
  const [activeBarColor, setActiveBarColor] = useState({
    tabOne: `#${strings.FundamentalDict.MenuBarColor}`,
    textOne: theme.colors.white,
    tabTwo: theme.colors.white,
    textTwo: `#${strings.FundamentalDict.MenuBarColor}`,
    tabThree: theme.colors.white,
    textThree: `#${strings.FundamentalDict.MenuBarColor}`,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    redrawGraphs();
  }, [data, isFocused]);

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

  const yLabelIterator = yLabel();

  const _getDataForGraph = item => {
    switch (item) {
      case 'one':
        setDataMultiple(1);
        setActiveData(data.BilgeStatusHistoryPeriodShort);
        break;
      case 'two':
        setDataMultiple(6);
        setActiveData(data.BilgeStatusHistoryPeriodMid);
        break;
      case 'three':
        setDataMultiple(35);
        setActiveData(data.BilgeStatusHistoryPeriodLong);
        break;

      default:
        break;
    }
  };
  return (
    <View style={GlobalStyle.container}>
      <TopBar title={data.LanguageDict.Title_Bilge} />
      <TabBar
        onClick={item => {
          _getDataForGraph(item);
          setColor(
            item,
            setActiveBarColor,
            `#${strings.FundamentalDict.MenuBarColor}`,
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
      <View style={GlobalStyle.contentContainerWithTabBar}>
        <View style={{...GlobalStyle.card, height: hp('13%')}}>
          <View>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.General_BilgeWaterHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
                marginTop: hp('0.5%'),
              }}>
              {data.BilgeStatusCurrent}
            </Text>
          </View>
        </View>
        <View style={{...GlobalStyle.card, height: hp('45%')}}>
          {isFocused && activeData.length > 0 && (
            <LineChart
              data={{
                labels: activeData.map((item, index) => {
                  if (index % dataMultiple === 0) {
                    return moment(item.TimeStamp).format('DD/MMM');
                  }
                  if (index === activeData.length - 1) {
                    return moment(item.TimeStamp).format('DD/MMM');
                  } else {
                    return '';
                  }
                }),
                datasets: [
                  {
                    data: activeData.map((item, index) => {
                      return parseInt(item.BilgeStatus || 0);
                    }),
                    color: (opacity = 1) => 'rgba(0, 0, 0, 1)',
                    strokeWidth: 1.5,
                  },
                ],
              }}
              width={wp('85%')} // from react-native
              height={hp('40%')}
              withVerticalLabels={true}
              formatYLabel={ylabel => yLabelIterator.next().value}
              // yLabelsOffset={0}
              segments={2}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                propsForVerticalLabels: {},
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {fontSize: hp('1%')},
                propsForDots: {
                  r: '0',
                  strokeWidth: '0',
                  stroke: 'black',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 8,
                paddingRight: wp('8%'),
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default BilgeScreen;

const styles = StyleSheet.create({
  detailsText: {
    marginTop: 2,
    fontSize: hp('2.3%'),
    color: theme.colors.black,
    fontFamily: Font.REGULAR,
  },
  detailValueText: {
    fontSize: hp('3.2%'),
    fontFamily: Font.THIN,
    color: theme.colors.font,
  },
});
