import { NavigationActions, StackActions } from 'react-navigation';

let nav;

const resetAction = (routeName) => StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName })],
});

const popAction = StackActions.pop({
  n: 1,
});

function setTopLevelNavigatior(navigatorRef) {
  nav = navigatorRef;
}

function navigate(routeName, params) {
  nav.dispatch(NavigationActions.navigate({ routeName, params }));
}

function resetNavigation(routeName) {
  nav.dispatch(resetAction(routeName));
}

function pop() {
  nav.dispatch(popAction);
}

function popToTop() {
  nav.dispatch(StackActions.popToTop());
}

export default {
  setTopLevelNavigatior,
  navigate,
  resetNavigation,
  pop,
  popToTop,
};
