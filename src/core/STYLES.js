import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {theme} from './Colors';
import {Font} from './Fonts';
export const GlobalStyle = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? hp('100%'):hp("80%"),
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    height: Platform.OS === 'ios' ? hp('70%') : hp('72%'),
    justifyContent: 'space-around',
    paddingHorizontal: wp('5%'),
  },
  contentContainerWithTabBar: {
    height: hp('65%'),
    justifyContent: 'space-around',
    paddingHorizontal: wp('5%'),
  },
  card: {
    padding: hp('1%'),
    backgroundColor: theme.colors.white,
    borderRadius: hp('0.8%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  detailsText: {
    marginTop: hp("0.2%"),
    fontSize: hp('3%'),
    fontWeight: '500',
    color: theme.colors.black,
    fontFamily: Font.THIN,
  },
  updateText: {
    alignSelf: 'flex-end',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginTop: hp('0.7%'),
    marginRight: wp('5%'),
    fontFamily: Font.THIN,
  },
  title: {
    fontSize: hp('3.0%'),
    color: theme.colors.splashScreenGradient2,
    textAlign: 'center',
    fontFamily: Font.REGULAR,
  },
  subTitle: {
    fontSize: hp('2.2%'),
    color: theme.colors.splashScreenGradient2,
    textAlign: 'center',
    marginTop: hp('0.5%'),
    fontFamily: Font.THIN,
  },
});
