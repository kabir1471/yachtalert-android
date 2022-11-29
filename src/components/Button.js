import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {theme} from '../core/Colors';
import {Font} from '../core/Fonts';
import {deviceIdData} from '../core/GlobalData';

const Button = ({text, loading, onPress}) => {
  const [preqRead] = deviceIdData.use();
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: `#${preqRead.FundamentalDict.MenuBarColor}`,
      }}
      onPress={onPress}>
      <Text
        style={{
          ...styles.text,
          color: `#${preqRead.FundamentalDict.MenuTextColor}`,
        }}>
        {text}
      </Text>
      {loading && <ActivityIndicator color="white" />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    height: 40,
    width: 140,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: Font.THIN,
    fontSize: 20,
    fontWeight: '500',
    paddingRight: 10,
  },
});
