/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { RNCamera } from 'react-native-camera';
import CodePush from '~/config/CodePush';
import { colors } from '~/styles';
import { Gradient } from './styles';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <Gradient
        colors={[colors.secundary, colors.primary]}
        startPoint={{ x: 1, y: 1 }}
        endPoint={{ x: 1, y: 1 }}
      >
        <CodePush />
        <RNCamera
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            height: '80%',
          }}
          onBarCodeRead={() => null}
          ref={(cam) => (this.camera = cam)}
        />
      </Gradient>
    );
  }
}

export default AuthLoadingScreen;
