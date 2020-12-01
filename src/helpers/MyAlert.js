import {Alert} from 'react-native';
import i18n from '../i18n/i18n';
export function AlertMsg(title, msg, cancel_callback, ok_callback) {
  Alert.alert(
    `${title}`,
    `${msg}`,
    [
      {
        text: `${i18n.t('cancel')}`,
        onPress: () =>
          cancel_callback != null ? cancel_callback : console.log('No Call back'),
        style: 'cancel',
      },
      {text: `${i18n.t('ok')}`,
       onPress: () => 
        ok_callback != null ? ok_callback : console.log('No Call back')},
    ],
    {cancelable: false},
  );
}
