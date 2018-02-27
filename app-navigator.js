import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Platform, BackHandler, AsyncStorage } from 'react-native';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import AppNavigator from './routes';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

class AppNavigatorRedux extends React.Component {
  render() {
    const { dispatch, navigation } = this.props;

    const newNavigation = addNavigationHelpers({
      dispatch,
      state: navigation,
      addListener,
    });
    return <AppNavigator navigation={newNavigation} />;
  }
}

AppNavigatorRedux.propTypes = {};

const mapStateToProps = state => ({
  navigation: state.nav,
});

export default connect(mapStateToProps)(AppNavigatorRedux);

export { AppNavigator };
