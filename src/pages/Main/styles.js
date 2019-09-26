import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, metrics } from '~/styles';
import { ifStyle } from '~/utils/ifStyle';

const hasMargin = ifStyle('last');

export const Title = styled.Text`
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: ${colors.white};
  font-weight: bold;
  margin-bottom: ${hasMargin(metrics.baseMargin * 2, 0)};
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: ${colors.white};
  margin-bottom: ${hasMargin(metrics.baseMargin * 10, 0)};
`;

export const Gradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const View = styled.View`
  height: ${metrics.screenHeight / 6};
`;
