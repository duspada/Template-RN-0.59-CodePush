/* eslint-disable no-console */
import { NativeModules } from 'react-native';
import Reactotron, {
  asyncStorage, networking, devTools, trackGlobalErrors, openInEditor, overlay,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];
  const tron = Reactotron.configure({ host: scriptHostname })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(asyncStorage())
    .use(networking())
    .use(devTools())
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
