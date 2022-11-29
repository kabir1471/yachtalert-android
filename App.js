import React, {useEffect, useRef, useState} from 'react';
import {AppState, Platform, StyleSheet, Text, View} from 'react-native';
import {setBadgeCount} from 'react-native-notification-badge';
import {getData} from './src/core/api';
import {deviceId} from './src/core/GlobalData';
import RootNavigator from './src/navigation';
import {DataProvider} from './src/providers/data.provider';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setBadgeCount(0);
    }
  }, []);
  return <RootNavigator />;
};

export default App;

const styles = StyleSheet.create({});
