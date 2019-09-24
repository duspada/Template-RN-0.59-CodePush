import React from 'react';

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
      </Gradient>
    );
  }
}

export default AuthLoadingScreen;
