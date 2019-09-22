import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { isIOS } from './isIOS';

export const calculateSpacing = ({ childSize, spacing }) => ({ children }) => {
  if (!Array.isArray(children)) return 'auto';

  return childSize * children.length + spacing * (children.length - 1);
};

export const getTheme = (themeProp) => ({ theme }) => get(theme, themeProp);

export const ifStyle = (prop) => (truly, falsy = null) => (props) => (props[prop] ? truly : falsy);

// Same as ifStyles, but with string.
// The third argument is the value to be passed should props[prop] be empty/undefined
export const ifStyleMatches = (prop, type) => (truly, falsy, defaultValue) => (
  props,
) => {
  if (!props[prop]) return defaultValue;
  return props[prop] === type ? truly : falsy;
};

export const setStyleIOS = (truthy, falsy) => (isIOS() ? truthy : falsy);

export const switchStyle = (prop) => (stylesObj) => (props) => {
  const propValue = props[prop] || 'default';
  const switchObj = stylesObj[propValue];

  if (isFunction(switchObj)) return switchObj(props);

  return switchObj;
};
