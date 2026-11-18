import { Alert, Platform, ToastAndroid } from 'react-native';

// A small native message that works on both Android and iOS.
export function showLocalMessage(message) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('CeylonEats', message);
  }
}
