import { RSA, RSAKeychain } from 'react-native-rsa-native';
import * as Keychain from 'react-native-keychain';
import { toOnlyNumbers, removeWhiteSpaces } from '~/utils/stringHelper';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';

import NavigationService from '~/services/navigation';

export const signature = async (values) => {
  const challange = await api.post(
    '/security/authentication/challenge',
    {
      cpf: toOnlyNumbers(values.cpf),
    },
    {
      validateStatus: function(status) {
        return status < 500;
      },
    },
  );

  const sign = `${toOnlyNumbers(values.cpf)}&${values.password}&${
    challange.data.challenge
  }`;
  return removeWhiteSpaces(await signMessage('deviceKey', sign));
};

export const encryptWithHeader = async (key, message) => {
  const keyHeader = '-----BEGIN PUBLIC KEY-----';
  const keyFooter = '-----END PUBLIC KEY-----';
  const lineBreak = '\r\n';
  const publick = `${keyHeader}${lineBreak}${key}${lineBreak}${keyFooter}`;
  return RSA.encrypt(message, publick);
};

export const clearKey = async () => {
  try {
    await AsyncStorage.removeItem('@token');
    NavigationService.resetNavigation('Login');
  } catch (error) {
    return error;
  }
};

export const signMessage = async (keyTag, message) => {
  return RSAKeychain.sign(message, keyTag);
};

export const createKeys = (keyTag) => {
  return RSAKeychain.generate(keyTag);
};

export const getKey = () => {
  return Keychain.getGenericPassword();
};

export const hasSetKey = async () => {
  const key = await Keychain.getGenericPassword();
  return key.username === 'keyPayment';
};

export const hasSetKeyPIN = async () => {
  // return hasUserSetPinCode();
};

export const saveKey = (publicKey) => {
  const newPublic = publicKey
    .replace('-----BEGIN RSA PUBLIC KEY-----', '')
    .replace('-----END RSA PUBLIC KEY-----', '')
    .replace(/(\r\n|\n|\r)/gm, '');
  return Keychain.setGenericPassword('keyPayment', newPublic);
};

export const getKeyGeneric = () => {
  return Keychain.getGenericPassword();
};
