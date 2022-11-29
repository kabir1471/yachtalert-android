import axios from 'axios';
import moment from 'moment-timezone';
import {loading, userData} from '../GlobalData';
import {ROUTES} from '../Index';

export const getEndpoints = async (id, navigation) => {
  try {
    const {data} = await axios({
      url: `https://api.yachtalert.nl/api/v1/init1?deviceid=${id}`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    navigation.navigate(ROUTES.NO_INTERNET);
    return error;
  }
};

export const getData = async (id, url, lang, setLoading, navigation) => {
  const zone = moment().tz(moment.tz.guess()).format('z');
  const data = new FormData();
  data.append('deviceid', id);
  data.append('submit', 'submit');
  data.append('languagecode', lang);
  data.append('timezone', zone);
  axios
    .post(url, data, {
      headers: {
        Connection: 'close',
      },
    })
    .then(async res => {
      setLoading(false);
      // console.log(res.data);
      userData.set(res.data);
      if (res.data.ContractStatus) {
        if (res.data.ContractStatus.ContractState == 1) {
          navigation.navigate(ROUTES.HOME_SCREEN, res.data);
        } else if (res.data.ContractStatus.ContractState == 0) {
          navigation.navigate(ROUTES.EXPIRED_SUBSCRIPTION);
        } else {
          navigation.navigate(ROUTES.NOT_FOUND);
        }
      }
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      navigation.navigate(ROUTES.NO_INTERNET);
    });
};

export const changeGeofence = async (
  id,
  url,
  lang,
  setLoading,
  setGlobalLoading,
) => {
  const zone = moment().tz(moment.tz.guess()).format('z');
  const request = new FormData();
  request.append('deviceid', id);
  request.append('submit', 'submit');
  request.append('languagecode', lang);
  request.append('timezone', zone);
  setLoading(true);
  axios({
    method: 'POST',
    url: url.geofencetoggle,
    data: request,
  })
    .then(res => {
      refreshData(id, url.fullread, lang, setGlobalLoading);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const sendTestNotification = async (
  id,
  url,
  lang,
  setLoading,
  setGlobalLoading,
) => {
  const zone = moment().tz(moment.tz.guess()).format('z');
  const data = new FormData();
  data.append('deviceid', id);
  data.append('submit', 'submit');
  data.append('languagecode', lang);
  data.append('timezone', zone);
  setLoading(true);
  axios({
    method: 'POST',
    url: url.notificationtestbutton,
    data: data,
  })
    .then(rs => {
      refreshData(id, url.fullread, lang, setGlobalLoading);
    })
    .catch(err => {})
    .finally(() => {
      setLoading(false);
    });
};

export const refreshData = (id, url, lang, setGlobalLoading) => {
  setGlobalLoading(true);
  const zone = moment().tz(moment.tz.guess()).format('z');
  const data = new FormData();
  data.append('deviceid', id);
  data.append('submit', 'submit');
  data.append('languagecode', lang);
  data.append('timezone', zone);
  axios
    .post(url, data, {
      headers: {
        Connection: 'close',
      },
    })
    .then(async res => {
      userData.set(res.data);
      setGlobalLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
};

export const storeToken = async (url, id, token) => {
  const data = new FormData();
  data.append('deviceid', id);
  data.append('apptoken', token);
  data.append('submit', 'submit');
  await axios({
    method: 'POST',
    url,
    data: data,
    headers: {
      Connection: 'close',
    },
  });
};
