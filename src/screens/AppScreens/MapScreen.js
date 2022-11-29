import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {theme} from '../../core/Colors';
import {changeGeofence} from '../../core/api';
import {useIsFocused} from '@react-navigation/native';
import {Font} from '../../core/Fonts';

const MapScreen = ({navigation}) => {
  const [data, setData] = userData.use();
  const [id, setDevice] = deviceId.use();
  const [lang] = languageString.use();
  const [urls] = endpoints.use();
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    data.CoordinatesCurrent,
  );
  const isFocused = useIsFocused();
  const [strings] = deviceIdData.use();
  const [globalLoading, setGlobalLoading] = gLoading.use();

  useEffect(() => {
    setCurrentLocation(data.CoordinatesCurrent);
    return () => {
      setCurrentLocation(null);
    };
  }, [isFocused, data]);

  const activateGeofence = () => {
    setLoading(true);
    changeGeofence(id, urls, lang, setLoading, setGlobalLoading);
  };

  return (
    <View style={GlobalStyle.container}>
      <TopBar title={data.LanguageDict.Title_Map} />
      <Text
        style={{
          ...GlobalStyle.updateText,
          color: `#${strings.FundamentalDict.ItemTextMainColor}`,
        }}>
        {!globalLoading
          ? data.TimeSinceLastFixUpdateMessage
          : data.LanguageDict.ConnectState}
      </Text>
      <View style={GlobalStyle.contentContainer}>
        <View
          style={{
            ...GlobalStyle.card,
            height: hp('45%'),
          }}>
          {currentLocation && (
            <MapView
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: JSON.parse(currentLocation.Latitude),
                longitude: JSON.parse(currentLocation.Longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              initialRegion={{
                latitude: JSON.parse(currentLocation.Latitude),
                longitude: JSON.parse(currentLocation.Longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}>
              <Marker
                coordinate={{
                  latitude: JSON.parse(currentLocation.Latitude),
                  longitude: JSON.parse(currentLocation.Longitude),
                }}
                title="Current Location"
              />
            </MapView>
          )}
        </View>
        <View style={{...GlobalStyle.card, height: hp('22%')}}>
          <View style={styles.topText}>
            <Text
              style={{
                ...styles.detailsText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
              }}>
              {data.LanguageDict.Screen_Map_GeofenceStatusHeader}
            </Text>
            <Text
              style={{
                ...styles.detailValueText,
                color: `#${strings.FundamentalDict.ItemTextAccentColor}`,
              }}>
              {data.GeofenceStatusTextMain}
            </Text>
            <Text
              style={{
                ...styles.detailText,
                color: `#${strings.FundamentalDict.ItemTextMainColor}`,
                marginTop: hp('0.5%'),
              }}>
              {data.GeofenceStatusTextSub}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: `#${strings.FundamentalDict.MenuBarColor}`,
            }}
            disabled={loading}
            onPress={() => activateGeofence()}>
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
                {data.GeofenceButtonText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

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
    marginTop: hp('0.4%'),
  },
  detailText: {
    fontSize: hp('1.9%'),
    fontFamily: Font.THIN,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  subText: {
    fontSize: hp('2%'),
    color: theme.colors.black,
    fontFamily: Font.THIN,
    marginTop: hp('0.2%'),
  },
  button: {
    height: hp('6%'),
    width: wp('55%'),
    borderRadius: hp('1%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: hp('2.7%'),
    fontFamily: Font.THIN,
  },
});
