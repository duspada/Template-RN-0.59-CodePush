import { Platform } from 'react-native';

const IOS_PLATFORM = 'ios';

export const isIOS = () => Platform.OS === IOS_PLATFORM;
