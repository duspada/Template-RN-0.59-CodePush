import { setCustomText } from 'react-native-global-props';
import { colors } from '~/styles';

const customTextProps = {
  style: {
    fontFamily: 'Montserrat',
    color: colors.defaultBlack,
  },
};

setCustomText(customTextProps);
