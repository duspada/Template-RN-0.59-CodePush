import React from 'react';

import {
  StyleSheet, ImageBackground, StatusBar,
} from 'react-native';

import CodePush from '~/config/CodePush';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
});

const Main = () => (
  <ImageBackground
    source={{
      uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
    }}
    style={styles.container}
    resizeMode="cover"
  >
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    <CodePush />
  </ImageBackground>
);

export default Main;
