// import { AsyncStorage } from 'react';
// import { RSA, RSAKeychain } from 'react-native-rsa-native';
// import * as Keychain from 'react-native-keychain';

// import NavigationService from '~/services/navigation';

// export const encryptWithHeader = async (key, message) => {
//   const keyHeader = '-----BEGIN PUBLIC KEY-----';
//   const keyFooter = '-----END PUBLIC KEY-----';
//   const lineBreak = '\r\n';
//   const publick = `${keyHeader}${lineBreak}${key}${lineBreak}${keyFooter}`;
//   return RSA.encrypt(message, publick);
// };

// export const clearKey = async () => {
//   try {
//     await AsyncStorage.removeItem('@token');
//     NavigationService.resetNavigation('Login');
//   } catch (error) {
//     return error;
//   }
// };

// export const signMessage = async (keyTag, message) => RSAKeychain.sign(message, keyTag);

// export const createKeys = (keyTag) => RSAKeychain.generate(keyTag);

// export const getKey = () => Keychain.getGenericPassword();

// export const hasSetKey = async () => {
//   const key = await Keychain.getGenericPassword();
//   return key.username === 'keyPayment';
// };

// export const hasSetKeyPIN = async () => {
//   // return hasUserSetPinCode();
// };

// export const saveKey = (publicKey) => {
//   const newPublic = publicKey
//     .replace('-----BEGIN RSA PUBLIC KEY-----', '')
//     .replace('-----END RSA PUBLIC KEY-----', '')
//     .replace(/(\r\n|\n|\r)/gm, '');
//   return Keychain.setGenericPassword('keyPayment', newPublic);
// };

// export const getKeyGeneric = () => Keychain.getGenericPassword();
