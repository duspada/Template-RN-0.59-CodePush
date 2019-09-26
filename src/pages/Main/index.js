/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Svg, {
  Circle,
  Rect,
} from 'react-native-svg';
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
        <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>
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
