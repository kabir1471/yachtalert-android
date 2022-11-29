import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from './Colors';
import axios from 'axios';
import {deviceIdData} from './GlobalData';

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Async Clear', e);
  }
};

export const storeDeviceId = async value => {
  try {
    await AsyncStorage.setItem('deviceID', value);
  } catch (e) {
    console.log(e);
  }
};

export const getDeviceId = async () => {
  try {
    const value = await AsyncStorage.getItem('deviceID');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const convertTimeToLocal = date => {
  return (local = moment.utc(date).local().format());
};

export const setColor = (item, setActiveBarColor, mainColor) => {
  if (item === 'one') {
    setActiveBarColor({
      tabOne: mainColor,
      tabTwo: theme.colors.white,
      textOne: theme.colors.white,
      textThree: mainColor,
      textTwo: mainColor,
      tabThree: theme.colors.white,
    });
    // getDataForTabs(7);
  } else if (item === 'two') {
    setActiveBarColor({
      tabOne: theme.colors.white,
      tabTwo: mainColor,
      tabThree: theme.colors.white,
      textOne: mainColor,
      textThree: mainColor,
      textTwo: theme.colors.white,
    });
    // getDataForTabs(30);
  } else {
    setActiveBarColor({
      tabOne: theme.colors.white,
      tabTwo: theme.colors.white,
      tabThree: mainColor,
      textOne: mainColor,
      textThree: theme.colors.white,
      textTwo: mainColor,
    });
    // getDataForTabs(365);
  }
};

export const _getIDScreenStrings = async (lang, url) => {
  const data = new FormData();
  data.append('languagecode', lang);
  data.append('submit', 'submit');
  axios({
    url: url,
    method: 'POST',
    data: data,
    headers: {
      Connection: 'close',
    },
  })
    .then(res => {
      deviceIdData.set(res.data);
      console.log('axios', res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const filterGraphData = data => {
  const temp = data.filter((item, index) => {
    if (index % 6 === 0 && data[index - 1] !== data[index]) {
      return item;
    }
  });
  return temp;
};

export const filterBateryData = data => {
  const temp = data.filter((item, index) => {
    if (index % 6 === 0) {
      return item;
    }
  });
  return temp;
};
