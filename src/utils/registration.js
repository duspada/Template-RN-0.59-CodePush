import * as Keychain from 'react-native-keychain';
import Analytics from 'appcenter-analytics';
import { Alert } from 'react-native';
import NavigationService from '~/services/navigation';
export async function goToLastScreen() {
  try {
    Analytics.trackEvent('New User', {
      // Category: 'New',
      // FileName: 'User',
    });
    // const lastScreen = await Keychain.getInternetCredentials('lastScreen');
    // if (lastScreen) {
    //   NavigationService.resetNavigation(lastScreen.username);
    // } else {
    NavigationService.navigate('CreateInform');
    // }
  } catch (error) {
    Alert.alert(error.message);
  }
}

export async function setLastScreen(params) {
  try {
    await Keychain.setInternetCredentials('lastScreen', params, '1');
  } catch (error) {
    Alert.alert(error);
  }
}

export async function setRegistrationItem(params, route) {
  try {
    const ifNew = JSON.stringify(params);
    let storage = await Keychain.getInternetCredentials('registration');
    if (!storage) {
      await Keychain.setInternetCredentials('registration', ifNew, '1');
      return NavigationService.navigate(route);
    }
    let newStorageItem = JSON.parse(storage.username);
    newStorageItem = { ...newStorageItem, ...params };

    await Keychain.setInternetCredentials(
      'registration',
      JSON.stringify(newStorageItem),
      '1',
    );
    NavigationService.navigate(route);
  } catch (error) {
    Alert.alert(error.message);
  }
}
