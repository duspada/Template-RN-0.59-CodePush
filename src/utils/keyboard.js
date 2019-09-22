import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { shape } from 'prop-types';

// eslint-disable-next-line react/prop-types
const DismissKeyboardHOC = (Comp) => ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <Comp {...props}>{children}</Comp>
  </TouchableWithoutFeedback>
);

DismissKeyboardHOC.propTypes = {
  children: shape().isRequired,
};

const DismissKeyboardView = DismissKeyboardHOC(View);

export default DismissKeyboardView;
