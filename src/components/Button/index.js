/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  number, string, bool, oneOfType, shape, func,
} from 'prop-types';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import If from '~/utils/if';
import { colors } from '~/styles';
import styles from './styles';

const Container = TouchableOpacity;

const Button = ({
  style,
  title,
  size,
  onPress,
  color,
  loading,
  iconName,
  iconSize,
  iconColor,
  iconSide,
  titleColor,
  border,
  borderColor,
  borderWidth,
  shadow,
  titleWeight,
  iconAwesome,
  antDesign,
  titleSize,
  subtitle,
  subtitleColor,
  subtitleWeight,
  subtitleSize,
  flexDirection,
}) => (loading ? (
  <Container
    style={[
      shadow ? styles.container : styles.containerNoShadow,
      border ? { borderColor, borderWidth } : null,
      { width: !size ? '90%' : size, backgroundColor: color },
      { minWidth: !size ? '90%' : size, backgroundColor: color },
      flexDirection ? { flexDirection } : null,
      style,
    ]}
  >
    <ActivityIndicator />
  </Container>
) : (
  <Container
    onPress={onPress}
    style={[
      shadow ? styles.container : styles.containerNoShadow,
      border ? { borderColor, borderWidth } : null,
      { width: !size ? '90%' : size, backgroundColor: color },
      { minWidth: !size ? '90%' : size, backgroundColor: color },
      flexDirection ? { flexDirection } : null,
      style,
    ]}
  >
    {iconSide === 'left' ? (
      iconAwesome ? (
        <IconAwesome name={iconName} size={iconSize} color={iconColor} />
      ) : antDesign ? (
        <IconAnt name={iconName} size={iconSize} color={iconColor} />
      ) : (
        <IconFeather name={iconName} size={iconSize} color={iconColor} />
      )
    ) : null}
    <Text
      style={[
        styles.title,
        titleColor ? { color: titleColor } : null,
        titleWeight ? { fontWeight: 'bold' } : null,
        titleSize ? { fontSize: titleSize } : null,
      ]}
    >
      {title}
    </Text>
    <If test={subtitle}>
      <Text
        style={[
          styles.subtitle,
          subtitleColor ? { color: subtitleColor } : null,
          subtitleWeight ? { fontWeight: 'bold' } : null,
          subtitleSize ? { fontSize: subtitleSize } : null,
        ]}
      >
        {subtitle}
      </Text>
    </If>
    {iconSide === 'right' ? (
      iconAwesome ? (
        <IconAwesome name={iconName} size={iconSize} color={iconColor} />
      ) : (
        <IconFeather name={iconName} size={iconSize} color={iconColor} />
      )
    ) : null}
  </Container>
));

Button.propTypes = {
  size: oneOfType([string, number]),
  style: shape(),
  title: number.isRequired,
  titleWeight: bool,
  titleSize: string,
  onPress: func.isRequired,
  color: string,
  loading: bool,
  iconName: string,
  iconSide: string,
  iconColor: string,
  iconSize: number,
  border: bool,
  shadow: bool,
  borderColor: string,
  borderWidth: number,
  titleColor: string,
  iconAwesome: bool,
  antDesign: bool,
  subtitle: string,
  subtitleColor: string,
  subtitleWeight: string,
  subtitleSize: number,
  flexDirection: string,
};

Button.defaultProps = {
  size: '90%',
  style: null,
  border: false,
  borderColor: colors.darkGrey,
  borderWidth: 0.2,
  iconName: null,
  iconSide: null,
  iconSize: null,
  iconColor: null,
  loading: false,
  shadow: true,
  color: colors.tertiary,
  titleColor: colors.white,
  titleSize: null,
  titleWeight: false,
  iconAwesome: false,
  antDesign: false,
  subtitle: null,
  subtitleColor: null,
  subtitleWeight: null,
  subtitleSize: null,
  flexDirection: 'column',
};

export default Button;
