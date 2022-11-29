import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import {theme} from '../../core/Colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  deviceId,
  deviceIdData,
  endpoints,
  languageString,
} from '../../core/GlobalData';
import {storeDeviceId} from '../../core/utills';
import Button from '../../components/Button';
import {getData} from '../../core/api';
import {RNCamera} from 'react-native-camera';
import {useIsFocused} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Font} from '../../core/Fonts';

const DeviceIdScreen = ({navigation}) => {
  const [deviceIdInput, setDeviceIdInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [strings, setStrings] = deviceIdData.use();
  const [languageStr] = languageString.use();
  const [endPoints] = endpoints.use();
  const focused = useIsFocused();

  const matchDeviceId = async id => {
    setLoading(true);
    const mId = deviceIdInput || id;
    deviceId.set(mId);
    await storeDeviceId(mId);
    await getData(mId, endPoints.fullread, languageStr, setLoading, navigation);
  };
  const onSuccess = e => {
    const id = e.data.toLowerCase();
    setDeviceIdInput(id);
    matchDeviceId(id);
  };

  return (
      
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {focused && (
          <QRCodeScanner
            onRead={onSuccess}
            reactivateTimeout={30000}
            cameraStyle={{
              height: Dimensions.get('window').height / 3,
              width: Dimensions.get('window').height / 3,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            ...styles.inputText,
            backgroundColor: `#${strings.FundamentalDict.MenuTextColor}`,
            borderColor: `#${strings.FundamentalDict.MenuBarColor}`,
            color: `#${strings.FundamentalDict.ItemTextAccentColor}`
          }}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={strings?.LanguageDict?.QR_Message}
          value={deviceIdInput}
          onChangeText={text => setDeviceIdInput(text.toLowerCase())}
          placeholderTextColor={`#${strings.FundamentalDict.ItemTextAccentColor}`}
        />
      </View>
      <Button
        loading={loading}
        onPress={matchDeviceId}
        text={strings?.LanguageDict?.QR_SendButtonText}
      />
    </View>
  );
};

export default DeviceIdScreen;

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: '20%',
  },
  cameraContainer: {
    flex: 0.5,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  inputText: {
    height: 40,
    marginTop: 100,
    borderRadius: 7,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: Font.REGULAR,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },
});
