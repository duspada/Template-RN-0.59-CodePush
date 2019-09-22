import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.defaultBlack,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: metrics.baseMargin,
    minWidth: '80%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  containerNoShadow: {
    alignItems: 'center',
    backgroundColor: colors.defaultBlack,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: metrics.baseMargin,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: metrics.baseMargin,
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: metrics.baseMargin,
    textAlign: 'center',
  },
});

export default styles;
